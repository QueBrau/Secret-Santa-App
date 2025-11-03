const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let transporter = null;

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const emailService = process.env.EMAIL_SERVICE || 'gmail';

if (emailUser && emailPass) {
  transporter = nodemailer.createTransport({
    service: emailService,
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });
  console.log(`Email service configured: ${emailService} (${emailUser})`);
} else {
  console.warn('Email credentials not configured. Set EMAIL_USER and EMAIL_PASS in .env file');
}

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    emailConfigured: transporter !== null
  });
});

app.post('/api/send-assignments', async (req, res) => {
  try {
    if (!transporter) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email service is not configured. Please set up EMAIL_USER and EMAIL_PASS in the .env file.' 
      });
    }

    const { assignments } = req.body;

    if (!assignments || !Array.isArray(assignments) || assignments.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid assignments data' 
      });
    }

    const results = [];
    const errors = [];

    for (const assignment of assignments) {
      try {
        const htmlMessage = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
            <div style="background: linear-gradient(135deg, #dc2626 0%, #16a34a 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Secret Santa Assignment</h1>
            </div>
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <p style="font-size: 18px; color: #333; margin-bottom: 20px;">Hi <strong>${assignment.giver.name}</strong>,</p>
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="font-size: 16px; color: #92400e; margin: 0;">
                  You are the Secret Santa for:
                </p>
                <p style="font-size: 24px; color: #16a34a; font-weight: bold; margin: 10px 0 0 0;">
                  ${assignment.receiver.name}
                </p>
              </div>
              <p style="font-size: 16px; color: #666; margin-top: 20px;">
                Please keep this assignment confidential.
              </p>
              <p style="font-size: 14px; color: #999; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                Happy holidays!
              </p>
            </div>
          </div>
        `;

        const textMessage = `Secret Santa Assignment

Hi ${assignment.giver.name},

You are the Secret Santa for: ${assignment.receiver.name}

Please keep this assignment confidential.

Happy holidays!`;

        const mailOptions = {
          from: `Secret Santa <${emailUser}>`,
          to: assignment.giver.email,
          subject: 'Your Secret Santa Assignment',
          text: textMessage,
          html: htmlMessage
        };

        await transporter.sendMail(mailOptions);

        results.push({
          giver: assignment.giver.name,
          email: assignment.giver.email,
          status: 'sent'
        });

        console.log(`Email sent to ${assignment.giver.name} (${assignment.giver.email})`);
      } catch (error) {
        console.error(`Failed to send email to ${assignment.giver.name}:`, error.message);
        errors.push({
          giver: assignment.giver.name,
          email: assignment.giver.email,
          error: error.message
        });
      }
    }

    res.json({
      success: true,
      sent: results.length,
      failed: errors.length,
      results,
      errors
    });

  } catch (error) {
    console.error('Error sending assignments:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
