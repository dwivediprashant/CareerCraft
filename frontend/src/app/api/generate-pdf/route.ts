import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { content, title } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // Create a simple HTML to PDF conversion using browser's print functionality
    // For production, you might want to use a service like Puppeteer or PDFKit
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${title || 'Cover Letter'}</title>
        <style>
          @page {
            margin: 1in;
            size: letter;
          }
          body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            color: #333;
            max-width: 100%;
            margin: 0;
            padding: 0;
          }
          .letter-content {
            white-space: pre-wrap;
            font-size: 12pt;
          }
          @media print {
            body { margin: 0; }
          }
        </style>
      </head>
      <body>
        <div class="letter-content">${content}</div>
      </body>
      </html>
    `;

    // Return HTML that will trigger browser print dialog
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `inline; filename="${title || 'cover-letter'}.html"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
