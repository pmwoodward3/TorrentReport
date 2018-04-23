const sender = 'admin@torrent.report';
const titleGen = body => `Torrent.Report > ${body}`;
const bodyHTML = body =>
  `<h1>Torrent.Report</h1><br /><p>Your token is <b>${body}</b></p><p><a href="https://torrent.report/activate?token=${body}">click here</a> to continue using your account.</p><hr /><p>❤️    <a href="https://torrent.report/>Torrent.Report</a>    🌏</p>`;
const bodyTEXT = body =>
  `Torrent.Report\nYour token is: ${body}. Or continue using your account by navigating to https://torrent.report/activate?token=${body}`;

const activateMessage = (token, receiver) => ({
  from: sender,
  to: receiver,
  subject: titleGen('Activate Your Account'),
  text: bodyTEXT(token),
  html: bodyHTML(token),
});

module.exports = activateMessage;
