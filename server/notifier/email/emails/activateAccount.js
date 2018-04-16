const sender = 'admin@torrent.report';
const titleGen = body => `Torrent.Report > ${body}`;
const bodyHTML = body =>
  `<h1>Torrent.Report</h1><br /><p>${body}</p><hr /><p>Torrent.Report ❤️ 🌏</p>`;
const bodyTEXT = body => `Torrent.Report\n${body} `;

const activateMessage = ({ message, title, receiver }) => ({
  from: sender,
  to: receiver,
  subject: titleGen(title),
  text: bodyTEXT(message),
  html: bodyHTML(message),
});

module.exports = { activateMessage };
