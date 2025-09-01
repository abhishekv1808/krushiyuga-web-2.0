const nodemailer = require('nodemailer');
const OTP = require('../models/OTP');

// Email configuration for OTP
const otpEmailConfig = {
    service: 'gmail',
    auth: {
        user: 'itbizonet@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'uinbulvxaszfxuik'
    }
};

// Create transporter for OTP emails
const otpTransporter = nodemailer.createTransport(otpEmailConfig);

// Generate random 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
const sendOTPEmail = async (email, otp) => {
    try {
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification - Krushiyuga</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Segoe UI', 'San Francisco', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    line-height: 1.6;
                    color: #374151;
                    background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
                    padding: 20px;
                }
                
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: #ffffff;
                    border-radius: 20px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    border: 1px solid #e5e7eb;
                }
                
                .header {
                    background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                }
                
                .logo {
                    font-size: 32px;
                    font-weight: bold;
                    margin-bottom: 8px;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                
                .tagline {
                    font-size: 16px;
                    opacity: 0.9;
                    font-weight: 300;
                }
                
                .content {
                    padding: 40px 30px;
                    text-align: center;
                }
                
                .title {
                    font-size: 28px;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 20px;
                    text-align: center;
                }
                
                .description {
                    font-size: 16px;
                    color: #6b7280;
                    margin-bottom: 30px;
                    line-height: 1.6;
                }
                
                .otp-container {
                    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
                    border-radius: 15px;
                    padding: 30px;
                    margin: 30px 0;
                    border: 2px dashed #16a34a;
                }
                
                .otp-label {
                    font-size: 14px;
                    color: #6b7280;
                    margin-bottom: 10px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-weight: 600;
                }
                
                .otp-code {
                    font-size: 36px;
                    font-weight: 800;
                    color: #16a34a;
                    letter-spacing: 8px;
                    margin: 15px 0;
                    font-family: 'Courier New', monospace;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                
                .timer {
                    font-size: 14px;
                    color: #dc2626;
                    font-weight: 600;
                    margin-top: 15px;
                }
                
                .warning {
                    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                    border-left: 4px solid #f59e0b;
                    padding: 20px;
                    margin: 30px 0;
                    border-radius: 8px;
                }
                
                .warning-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #92400e;
                    margin-bottom: 8px;
                }
                
                .warning-text {
                    font-size: 14px;
                    color: #a16207;
                    line-height: 1.5;
                }
                
                .footer {
                    background: #f9fafb;
                    padding: 30px;
                    text-align: center;
                    border-top: 1px solid #e5e7eb;
                }
                
                .footer-text {
                    font-size: 14px;
                    color: #6b7280;
                    margin-bottom: 15px;
                }
                
                .contact-info {
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    flex-wrap: wrap;
                    margin-top: 20px;
                }
                
                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 14px;
                    color: #374151;
                }
                
                .contact-icon {
                    width: 16px;
                    height: 16px;
                    color: #16a34a;
                }
                
                @media (max-width: 600px) {
                    .email-container {
                        margin: 10px;
                        border-radius: 15px;
                    }
                    
                    .content {
                        padding: 30px 20px;
                    }
                    
                    .otp-code {
                        font-size: 28px;
                        letter-spacing: 4px;
                    }
                    
                    .contact-info {
                        flex-direction: column;
                        gap: 15px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <div class="logo">🌱 Krushiyuga</div>
                    <div class="tagline">Your Partner in Sustainable Farming</div>
                </div>
                
                <div class="content">
                    <h1 class="title">Email Verification Required</h1>
                    <p class="description">
                        Thank you for contacting Krushiyuga! To ensure the security of your inquiry and prevent spam, 
                        please verify your email address using the OTP code below.
                    </p>
                    
                    <div class="otp-container">
                        <div class="otp-label">Your Verification Code</div>
                        <div class="otp-code">${otp}</div>
                        <div class="timer">⏰ Valid for 10 minutes only</div>
                    </div>
                    
                    <div class="warning">
                        <div class="warning-title">🔒 Security Notice</div>
                        <div class="warning-text">
                            Never share this OTP with anyone. Krushiyuga will never ask for your OTP via phone or other means.
                            If you didn't request this verification, please ignore this email.
                        </div>
                    </div>
                </div>
                
                <div class="footer">
                    <p class="footer-text">
                        This is an automated email for contact form verification. 
                        Once verified, our team will respond to your inquiry within 24 hours.
                    </p>
                    
                    <div class="contact-info">
                        <div class="contact-item">
                            <span class="contact-icon">📞</span>
                            <span>+91 99000 77948</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">✉️</span>
                            <span>nammakrushiyuga@gmail.com</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">🌐</span>
                            <span>www.krushiyuga.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;

        const mailOptions = {
            from: {
                name: 'Krushiyuga - Email Verification',
                address: 'itbizonet@gmail.com'
            },
            to: email,
            subject: '🔐 Verify Your Email - Krushiyuga Contact Form',
            html: htmlContent
        };

        const result = await otpTransporter.sendMail(mailOptions);
        console.log('✅ OTP email sent successfully:', result.messageId);
        
        return {
            success: true,
            messageId: result.messageId
        };
        
    } catch (error) {
        console.error('❌ Error sending OTP email:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Create and send OTP
const createAndSendOTP = async (email) => {
    try {
        // Delete any existing OTP for this email
        await OTP.deleteMany({ email: email.toLowerCase() });
        
        // Generate new OTP
        const otp = generateOTP();
        
        // Save OTP to database
        const newOTP = new OTP({
            email: email.toLowerCase(),
            otp: otp
        });
        
        await newOTP.save();
        console.log('✅ OTP saved to database for email:', email);
        
        // Send OTP email
        const emailResult = await sendOTPEmail(email, otp);
        
        if (emailResult.success) {
            return {
                success: true,
                message: 'OTP sent successfully to your email address.',
                otpId: newOTP._id
            };
        } else {
            // If email fails, delete the OTP from database
            await OTP.deleteOne({ _id: newOTP._id });
            return {
                success: false,
                message: 'Failed to send OTP email. Please try again.'
            };
        }
        
    } catch (error) {
        console.error('❌ Error creating and sending OTP:', error);
        return {
            success: false,
            message: 'Error generating OTP. Please try again.'
        };
    }
};

// Verify OTP
const verifyOTP = async (email, inputOTP) => {
    try {
        // Find the most recent OTP for this email (verified or unverified)
        const otpRecord = await OTP.findOne({
            email: email.toLowerCase()
        }).sort({ createdAt: -1 });
        
        if (!otpRecord) {
            return {
                success: false,
                message: 'No valid OTP found. Please request a new one.',
                shouldRequestNew: true
            };
        }
        
        // Check if OTP has expired (should be handled by MongoDB TTL, but double-check)
        const now = new Date();
        const otpAge = (now - otpRecord.createdAt) / 1000; // in seconds
        
        if (otpAge > 600) { // 10 minutes
            await OTP.deleteOne({ _id: otpRecord._id });
            return {
                success: false,
                message: 'OTP has expired. Please request a new one.',
                shouldRequestNew: true
            };
        }
        
        // If OTP is already verified and matches, allow it
        if (otpRecord.verified && otpRecord.otp === inputOTP.toString()) {
            return {
                success: true,
                message: 'Email verified successfully!',
                otpId: otpRecord._id
            };
        }
        
        // If not verified yet, check attempts and verify
        if (!otpRecord.verified) {
            // Check attempts
            if (otpRecord.attempts >= 3) {
                await OTP.deleteOne({ _id: otpRecord._id });
                return {
                    success: false,
                    message: 'Too many failed attempts. Please request a new OTP.',
                    shouldRequestNew: true
                };
            }
            
            // Verify OTP
            if (otpRecord.otp === inputOTP.toString()) {
                // Mark as verified
                otpRecord.verified = true;
                await otpRecord.save();
                
                return {
                    success: true,
                    message: 'Email verified successfully!',
                    otpId: otpRecord._id
                };
            } else {
                // Increment attempts
                otpRecord.attempts += 1;
                await otpRecord.save();
                
                const remainingAttempts = 3 - otpRecord.attempts;
                
                return {
                    success: false,
                    message: `Invalid OTP. ${remainingAttempts} attempts remaining.`,
                    remainingAttempts: remainingAttempts
                };
            }
        } else {
            // OTP is verified but doesn't match the input
            return {
                success: false,
                message: 'Invalid OTP. The verified OTP does not match.',
                remainingAttempts: 0
            };
        }
        
    } catch (error) {
        console.error('❌ Error verifying OTP:', error);
        return {
            success: false,
            message: 'Error verifying OTP. Please try again.'
        };
    }
};

// Clean up expired OTPs (optional, MongoDB TTL handles this automatically)
const cleanupExpiredOTPs = async () => {
    try {
        const result = await OTP.deleteMany({
            createdAt: { $lt: new Date(Date.now() - 10 * 60 * 1000) } // 10 minutes ago
        });
        console.log(`🧹 Cleaned up ${result.deletedCount} expired OTPs`);
    } catch (error) {
        console.error('❌ Error cleaning up expired OTPs:', error);
    }
};

module.exports = {
    createAndSendOTP,
    verifyOTP,
    cleanupExpiredOTPs
};
