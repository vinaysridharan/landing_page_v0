import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const formData = await req.json();
        
        // Primary SMTP configuration (Port 587 with STARTTLS)
        const transportConfig = {
            host: 'smtp.ionos.com', // Using primary IONOS SMTP server
            port: 587,
            secure: false, // false for STARTTLS
            requireTLS: true,
            auth: {
                user: "info@securecounsel.org",
                pass: "MySecureCounsel123",
            },
            tls: {
                // Required for STARTTLS
                ciphers: 'SSLv3',
                rejectUnauthorized: true,
            }
        };

        // Create transporter with primary configuration
        let transporter = nodemailer.createTransport(transportConfig);

        // Verify SMTP connection
        try {
            await transporter.verify();
            console.log('SMTP connection verified successfully');
        } catch (verifyError) {
            console.error('Primary SMTP configuration failed:', verifyError);
            
            // Fallback to SSL configuration (Port 465)
            console.log('Attempting fallback to SSL configuration...');
            const fallbackConfig = {
                ...transportConfig,
                port: 465,
                secure: true, // true for SSL
            };
            
            const fallbackTransporter = nodemailer.createTransport(fallbackConfig);
            
            try {
                await fallbackTransporter.verify();
                console.log('Fallback SMTP connection verified successfully');
                transporter = fallbackTransporter;
            } catch (fallbackError) {
                console.error('Fallback SMTP configuration failed:', fallbackError);
                throw new Error('Unable to establish SMTP connection with either configuration');
            }
        }

        // Format the data for better readability
        const formatEmploymentDetails = `
            <h2>Employment Details:</h2>
            <p>Employer Name: ${formData.employerName}</p>
            <p>Job Title: ${formData.jobTitle}</p>
            <p>Weekly Wage: ${formData.weeklyWage}</p>
            <p>Hours Worked: ${formData.hoursWorked}</p>
            <p>Overtime Paid: ${formData.overtimeStatus}</p>
        `;

        const formatRoleDetails = `
            <h2>Role Information:</h2>
            <p>Role Type: ${formData.roleDescription}</p>
        `;

        // Email to admin
        const adminMailOptions = {
            from: {
                name: 'Secure Counsel',
                address: "info@securecounsel.org"
            },
            to: "info@securecounsel.org",
            subject: 'New Case Assessment Submission',
            html: `
                <h1>New Case Assessment Submission</h1>
                
                <h2>Contact Information:</h2>
                <p>Name: ${formData.name}</p>
                <p>Email: ${formData.email}</p>
                <p>Phone: ${formData.phone}</p>

                ${formatEmploymentDetails}
                ${formatRoleDetails}

                <h2>Calculated Information:</h2>
                <p>Annual Wage: ${formData.annualWage}</p>
            `,
        };

        console.log(formData.email);

        const userMailOptions = {
            from: {
                name: 'Secure Counsel',
                address: "info@securecounsel.org"
            },
            to: formData.email,
            subject: 'Case Assessment Confirmation',
            html: `
                <h1>Thank You for Submitting Your Case Assessment</h1>
                
                <p>Dear ${formData.name},</p>
                
                <p>We have received your case assessment submission. Here's a summary of the information you provided:</p>
                
                ${formatEmploymentDetails}
                
                <h2>Next Steps:</h2>
                <ol>
                    <li>Our team will review your submission</li>
                    <li>If you haven't already scheduled a consultation, please do so at your earliest convenience</li>
                    <li>During the consultation, we'll discuss your case in detail and outline potential options</li>
                </ol>
                
                <p>If you need to update any information or have questions before your consultation, please don't hesitate to contact us.</p>
                
                <p>Best regards,<br>Your Legal Team</p>

                <p style="color: #666; font-size: 12px;">
                    This email is for informational purposes only and does not constitute legal advice. 
                    Your information is kept confidential in accordance with attorney-client privilege.
                </p>
            `,
        };

        try {
            // Send both emails
            await Promise.all([
                transporter.sendMail(adminMailOptions),
                transporter.sendMail(userMailOptions)
            ]);
            console.log('Emails sent successfully');
        } catch (sendError) {
            console.error('Error sending emails:', sendError);
            throw new Error(`Failed to send emails: ${sendError.message}`);
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Case assessment submitted successfully' 
        });

    } catch (error) {
        console.error('Error in email route:', error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || 'Failed to process case assessment',
            error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
        }, { 
            status: 500 
        });
    }
}