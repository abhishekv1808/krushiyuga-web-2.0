const nodemailer = require('nodemailer');

// Email configuration
const emailConfig = {
    service: 'gmail',
    auth: {
        user: 'itbizonet@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'uinbulvxaszfxuik'
    }
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Function to send inquiry notification email
const sendInquiryNotification = async (inquiryData) => {
    try {
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Inquiry - Krushiyuga</title>
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
                    max-width: 650px;
                    margin: 0 auto;
                    background: #ffffff;
                    border-radius: 20px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    border: 1px solid #e5e7eb;
                }
                
                .header {
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    padding: 40px 30px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }
                
                .logo {
                    font-size: 36px;
                    font-weight: 800;
                    color: #ffffff;
                    margin-bottom: 10px;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    position: relative;
                    z-index: 1;
                }
                
                .logo::before {
                    content: '🌱';
                    margin-right: 12px;
                    font-size: 32px;
                }
                
                .header-subtitle {
                    color: #d1fae5;
                    font-size: 18px;
                    font-weight: 500;
                    position: relative;
                    z-index: 1;
                    opacity: 0.95;
                }
                
                .content {
                    padding: 40px 30px;
                }
                
                .notification-badge {
                    display: inline-block;
                    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 30px;
                    font-weight: 700;
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 30px;
                    box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
                }
                
                .notification-badge::before {
                    content: '🚨';
                    margin-right: 8px;
                }
                
                .inquiry-title {
                    font-size: 28px;
                    font-weight: 700;
                    color: #111827;
                    margin-bottom: 8px;
                    line-height: 1.2;
                }
                
                .inquiry-subtitle {
                    color: #6b7280;
                    font-size: 16px;
                    margin-bottom: 35px;
                    font-weight: 400;
                }
                
                .details-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 25px;
                    margin-bottom: 35px;
                }
                
                .detail-card {
                    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                    border: 2px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 24px;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                
                .detail-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 4px;
                    height: 100%;
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                }
                
                .detail-label {
                    font-weight: 700;
                    color: #374151;
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                }
                
                .detail-value {
                    font-size: 18px;
                    color: #111827;
                    font-weight: 600;
                    word-wrap: break-word;
                }
                
                .detail-icon {
                    width: 20px;
                    height: 20px;
                    margin-right: 8px;
                    opacity: 0.8;
                }
                
                .message-section {
                    background: linear-gradient(135deg, #fefcbf 0%, #fef3c7 100%);
                    border: 2px solid #f59e0b;
                    border-radius: 16px;
                    padding: 25px;
                    margin: 30px 0;
                    position: relative;
                }
                
                .message-section::before {
                    content: '💬';
                    position: absolute;
                    top: -12px;
                    left: 20px;
                    background: #ffffff;
                    padding: 8px;
                    border-radius: 50%;
                    font-size: 18px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
                
                .message-label {
                    font-weight: 700;
                    color: #92400e;
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 12px;
                }
                
                .message-content {
                    color: #78350f;
                    font-size: 16px;
                    line-height: 1.6;
                    font-style: italic;
                    background: rgba(255, 255, 255, 0.5);
                    padding: 15px;
                    border-radius: 10px;
                    border-left: 4px solid #f59e0b;
                }
                
                .footer {
                    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
                    color: #d1d5db;
                    text-align: center;
                    padding: 35px 30px;
                    position: relative;
                }
                
                .footer::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #10b981 0%, #059669 50%, #047857 100%);
                }
                
                .footer-title {
                    font-size: 20px;
                    font-weight: 700;
                    margin-bottom: 12px;
                    color: #ffffff;
                }
                
                .footer-text {
                    font-size: 14px;
                    opacity: 0.8;
                    margin-bottom: 20px;
                }
                
                .action-button {
                    display: inline-block;
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    color: white;
                    padding: 15px 30px;
                    text-decoration: none;
                    border-radius: 30px;
                    font-weight: 700;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .timestamp {
                    background: rgba(16, 185, 129, 0.1);
                    color: #065f46;
                    padding: 12px 20px;
                    border-radius: 25px;
                    font-size: 13px;
                    font-weight: 600;
                    text-align: center;
                    margin-top: 25px;
                    border: 1px solid rgba(16, 185, 129, 0.2);
                }
                
                .priority-indicator {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                    color: white;
                    padding: 8px 15px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
                }
                
                @media (max-width: 600px) {
                    body { padding: 10px; }
                    .email-container { border-radius: 15px; }
                    .header, .content, .footer { padding: 25px 20px; }
                    .details-grid { grid-template-columns: 1fr; gap: 20px; }
                    .logo { font-size: 28px; }
                    .inquiry-title { font-size: 24px; }
                    .detail-card { padding: 20px; }
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <div class="logo">KRUSHIYUGA</div>
                    <div class="header-subtitle">Multi-Layer Integrated Farming Solutions</div>
                </div>
                
                <div class="content">
                    <div class="notification-badge">New Customer Inquiry</div>
                    
                    <h1 class="inquiry-title">New Investment Inquiry Received</h1>
                    <p class="inquiry-subtitle">A potential investor has submitted an inquiry through your website</p>
                    
                    <div class="details-grid">
                        <div class="detail-card">
                            <div class="detail-label">
                                <span class="detail-icon">👤</span>
                                Customer Name
                            </div>
                            <div class="detail-value">${inquiryData.name}</div>
                        </div>
                        
                        <div class="detail-card">
                            <div class="detail-label">
                                <span class="detail-icon">📧</span>
                                Email Address
                            </div>
                            <div class="detail-value">${inquiryData.email}</div>
                        </div>
                        
                        <div class="detail-card">
                            <div class="detail-label">
                                <span class="detail-icon">📱</span>
                                Phone Number
                            </div>
                            <div class="detail-value">${inquiryData.phone}</div>
                        </div>
                        
                        <div class="detail-card">
                            <div class="detail-label">
                                <span class="detail-icon">💰</span>
                                Investment Interest
                            </div>
                            <div class="detail-value">${inquiryData.investment_model || 'General Inquiry'}</div>
                        </div>
                    </div>
                    
                    ${inquiryData.message ? `
                    <div class="message-section">
                        <div class="message-label">Customer Message</div>
                        <div class="message-content">"${inquiryData.message}"</div>
                    </div>
                    ` : ''}
                    
                    <div class="timestamp">
                        📅 Inquiry received on ${new Date().toLocaleDateString('en-IN', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZone: 'Asia/Kolkata'
                        })} IST
                    </div>
                </div>
                
                <div class="footer">
                    <div class="footer-title">Ready to Connect?</div>
                    <div class="footer-text">
                        Follow up with this potential investor as soon as possible to maximize conversion opportunities.
                    </div>
                    <a href="mailto:${inquiryData.email}" class="action-button">
                        📧 Reply to Customer
                    </a>
                </div>
            </div>
        </body>
        </html>
        `;

        const emailOptions = {
            from: 'itbizonet@gmail.com',
            to: 'madhuhr1980@gmail.com',
            subject: `🌱 New Investment Inquiry - ${inquiryData.name}`,
            html: htmlContent
        };

        const result = await transporter.sendMail(emailOptions);
        console.log('Inquiry notification email sent successfully:', result.messageId);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error('Error sending inquiry notification email:', error);
        return { success: false, error: error.message };
    }
};

module.exports = {
    sendInquiryNotification
};
