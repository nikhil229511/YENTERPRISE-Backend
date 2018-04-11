var pdf=require('pdfkit');
var fs=require('fs');
var myDoc = new pdf;

myDoc.pipe(fs.createWriteStream('samplePDF.pdf'));

myDoc.font('Times-Roman')
     .fontSize(45)
     .text('helllo world PDF from nodejs.',100,100);

myDoc.end