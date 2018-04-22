const sender = 'admin@torrent.report';
const titleGen = body => `Torrent.Report > ${body}`;
const bodyHTML = body =>
  `<h1>Torrent.Report</h1><br /><p>your token is <b>${body}</b></p><hr /><p>Torrent.Report ❤️ 🌏</p>`;
const bodyTEXT = body => `Torrent.Report\n${body} `;

const activateMessage = ({ token, receiver }) => ({
  from: sender,
  to: receiver,
  subject: titleGen('Activate Your Account'),
  text: bodyTEXT(token),
  html: bodyHTML(token),
});

module.exports = { activateMessage };
