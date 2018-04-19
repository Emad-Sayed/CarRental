using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace CarRental.Controllers
{
    public class Operations : Controller
    {
        //
        // GET: /SendingEmails/
        public bool SendEmail(String toEmail, String subject, String emailBody)
            {
            try
                {
                String senderEmail = System.Configuration.ConfigurationManager.AppSettings["SenderEmail"].ToString();
                String senderPassword = System.Configuration.ConfigurationManager.AppSettings["SenderPassword"].ToString();

                System.Net.Mail.SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
                client.EnableSsl = true;
                client.Timeout = 100000;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(senderEmail, senderPassword);

                MailMessage emailMessage = new MailMessage(senderEmail, toEmail, subject, emailBody);
                emailMessage.IsBodyHtml = true;
                emailMessage.BodyEncoding = UTF8Encoding.UTF8;
                client.Send(emailMessage);

                return true;
                }
            catch (Exception ex)
                {
                return false;
                //throw;
                }
            }
        
	}
}