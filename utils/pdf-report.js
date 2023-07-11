const PDFDocument = require('pdfkit-table');

function buildPDF(user, workSessions, dataCallback, endCallback) {
    const doc = new PDFDocument({ margin: 30, size: 'A4', bufferPages: true, font: 'Courier' });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    let rows = workSessions.map(session => {
        let yearMonthDay = `${session.yearMonth}-${session.day}`;
        return [yearMonthDay, session.clockIn, session.clockOut, session.duration, session.working_from, session.user_note]
    });
    
    // get current date and format month and year for title
    const currentDate = new Date();
    const d = currentDate.toString().split(" ");
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const currentMonth = monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    doc
      .font("Helvetica-Bold")
      .fontSize(22)
      .fillColor('#720f0b')
      .text("SolidRun Monthly Attendance Report", { align: 'center' })
      .moveDown()
      .fontSize(16)
      .fillColor('#b20000')
      .text(`Worker: ${user.username}`, { align: 'left' })
      .fontSize(10)
      .moveDown()
      .moveDown();

    const table = {
        title:
        `${currentMonth} ${currentYear} Attendance Report`,
        subtitle: `Created at: ${d[0]} ${d[1]} ${d[2]} ${d[3]} ${d[4]}`,
        divider: {
          header: { disabled: true },
          horizontal: { disabled: false, width: 1, opacity: 1 },
          padding: 5,
          columnSpacing: 10,
        },
        headers: [
          { label: "Date", width: 80, renderer: null },
          { label: "Clock In", width: 80, renderer: null },
          { label: "Clock Out", width: 80, renderer: null },
          { label: "Total Time", width: 80, renderer: null },
          { label: "Working From", width: 80, renderer: null },
          { label: "Note", width: 100, renderer: null },
        ],
        rows: rows
    };

      doc.table(table, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12).fillColor('#812e2b'),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Helvetica-Bold").fontSize(10).fillColor('#951814');
          indexColumn === 0 && doc.addBackground(rectRow, 'pink', 0.15);
        },
      });
      doc.end();
















    // // Set the header font style
    // doc.font('Helvetica-Bold');
    // doc.fontSize(20);

    // // Set the header color
    // doc.fillColor('red');
    
    // // Center align the header
    // doc.text('SolidRun Attendence Report', { align: 'center' });
    
    // // Reset the font style and color
    // doc.font('Helvetica');
    // doc.fillColor('black');

    // // Add the user's name
    // doc.fontSize(12).text(`User: ${user.username}`);
    // doc.moveDown();
    

    // doc.moveDown();
    
    // // Reset the font style
    // doc.font('Helvetica');
    // doc.fontSize(12);
    
    // // Iterate over workSessions and add relevant data to the PDF
    // workSessions.forEach((session) => {
    //     doc.text(`Date: ${session.day}`);
    //     doc.text(`Clock In: ${session.clockIn}`);
    //     doc.text(`Clock Out: ${session.clockOut}`);
    //     doc.text(`Duration: ${session.duration}`);
    //     doc.moveDown();
    //     doc.moveDown();
    // });

    // doc.end();
}

module.exports = { buildPDF };





// module.exports = class PDF_report {
//     constructor(user, workSessions) {
//         this.username = user.username;
//         this.workSessions = workSessions;
//     }

//     async buildReportPDF() {
//         // Create a new PDFDocument
//         const doc = new PDFDocument();
//         doc.data


//         // Create a write stream to save the PDF document
//         // const stream = fs.createWriteStream('report.pdf');
//         // doc.pipe(stream);
    
//         doc.font('Helvetica-Bold');
//         doc.fontSize(16).text('Work Session Report', { align: 'center' });
    
//         doc.moveDown();
//         doc.font('Helvetica');
    
//         // Table headers
//         doc.fontSize(12).text('Date', { width: 100, align: 'left' });
//         doc.text('Clock In', { width: 100, align: 'left' });
//         doc.text('Clock Out', { width: 100, align: 'left' });
//         doc.text('Duration', { width: 100, align: 'left' });
    
//         // Table rows
//         doc.fontSize(10);
//         workSessions.forEach((session) => {
//         doc.text(session.day, { width: 100, align: 'left' });
//         doc.text(session.clockIn, { width: 100, align: 'left' });
//         doc.text(session.clockOut || '-', { width: 100, align: 'left' });
//         doc.text(session.duration ? session.duration.toString() : '-', { width: 100, align: 'left' });
//         });
    
//         doc.end();
//     }
// }



