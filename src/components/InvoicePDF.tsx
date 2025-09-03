import * as React from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Button } from '@/shadcn/ui/button'
import { invoiceData } from '@/MOCK_DATA'
import { numberToWords } from '@/Libs/Helper'

const InvoicePDF = () => {
  const { brandName, topRightLogo, invoiceNumber, invoiceDate, dueDate, from, to, items, summary } =
    invoiceData

  const handleDownloadInvoice = async () => {
    try {
      const invoiceElement = document.getElementById('invoice')
      if (!invoiceElement) return
      const canvas = await html2canvas(invoiceElement, { scale: 2 })
      const dataUrl = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'pt', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, 0, undefined, 'FAST')
      pdf.save(`invoice-${invoiceNumber}.pdf`)
    } catch (err) {
      console.error('Error generating PDF:', err)
    }
  }

  return (
    <div className="container mx-auto my-12 px-4">
      <div id="invoice" className="border border-gray-300 bg-white text-sm text-gray-700">
        <header className="relative bg-primary py-3 text-center text-white">
          <h1 className="text-2xl font-bold uppercase">Invoice</h1>
          {topRightLogo && (
            <img
              src={topRightLogo}
              alt="Top Right Logo"
              className="absolute right-4 top-2 h-10 object-contain"
            />
          )}
        </header>

        <div className="flex flex-col border-b border-gray-300 p-4 sm:flex-row sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <p className="font-semibold">
              Business Name: <span className="font-normal">{brandName}</span>
            </p>
            <p className="font-semibold">
              Address: <span className="font-normal">{from.address}</span>
            </p>
            <p className="font-semibold">
              Phone Number: <span className="font-normal">{from.phone}</span>
            </p>
          </div>
          <div>
            <p className="font-semibold">
              GSTIN No: <span className="font-normal">{from.gstin}</span>
            </p>
            <p className="font-semibold">
              Invoice No: <span className="font-normal">{invoiceNumber}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col border-b border-gray-300 sm:flex-row">
          <div className="w-full border-r border-gray-300 p-4 sm:w-1/2">
            <h2 className="mb-2 font-bold uppercase text-primary">Bill To</h2>
            <p className="font-semibold">
              Name: <span className="font-normal">{to.name}</span>
            </p>
            <p className="font-semibold">
              Address: <span className="font-normal">{to.address}</span>
            </p>
            <p className="font-semibold">
              Phone No: <span className="font-normal">{to.phone}</span>
            </p>
            <p className="font-semibold">
              GSTIN: <span className="font-normal">{to.gstin}</span>
            </p>
            <p className="font-semibold">
              State: <span className="font-normal">{to.state}</span>
            </p>
          </div>

          <div className="w-full p-4 sm:w-1/2">
            <h2 className="mb-2 font-bold uppercase text-primary">Shipping To</h2>
            <p className="font-semibold">
              Name: <span className="font-normal">{to.name}</span>
            </p>
            <p className="font-semibold">
              Address: <span className="font-normal">{to.address}</span>
            </p>
            <p className="font-semibold">
              Phone No: <span className="font-normal">{to.phone}</span>
            </p>
            <p className="font-semibold">
              GSTIN: <span className="font-normal">{to.gstin}</span>
            </p>
            <p className="font-semibold">
              State: <span className="font-normal">{to.state}</span>
            </p>
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-500/10 text-left text-sm font-semibold text-gray-700">
              <th className="border border-gray-300 px-2 py-1">S.No</th>
              <th className="border border-gray-300 px-2 py-1">Goods Description</th>
              <th className="border border-gray-300 px-2 py-1">HSN</th>
              <th className="border border-gray-300 px-2 py-1">QTY</th>
              <th className="border border-gray-300 px-2 py-1">MRP</th>
              <th className="border border-gray-300 px-2 py-1">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="text-sm">
                <td className="border border-gray-300 px-2 py-1">{idx + 1}</td>
                <td className="border border-gray-300 px-2 py-1">{item.description}</td>
                <td className="border border-gray-300 px-2 py-1">{item.hsn}</td>
                <td className="border border-gray-300 px-2 py-1">{item.quantity}</td>
                <td className="border border-gray-300 px-2 py-1">${item.rate}</td>
                <td className="border border-gray-300 px-2 py-1">${item.lineTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col sm:flex-row">
          <div className="w-full border-r border-gray-300 p-4 sm:w-2/3">
            <p className="mb-2 font-semibold">
              Amount in words:{' '}
              <span className="font-normal italic">
                {numberToWords(Number(summary.grandTotal.toString().split('.')[0]))} - Only
              </span>
            </p>
            <p className="mb-4 font-semibold">
              Discount: <span className="font-normal">{summary.discount ?? 0}</span>
            </p>
            <p className="mb-2 font-bold text-primary">Bank Details</p>
            <p className="font-semibold">
              Account Name: <span className="font-normal">{from.companyName}</span>
            </p>
            <p className="font-semibold">
              Account Number: <span className="font-normal">[1234567890]</span>
            </p>
            <p className="font-semibold">
              IFSC Code: <span className="font-normal">[IFSC-XXXX]</span>
            </p>
          </div>

          <div className="w-full p-4 sm:w-1/3">
            <p className="mb-2 font-semibold">
              SGST: <span className="font-normal">[0.00]</span>
            </p>
            <p className="mb-2 font-semibold">
              CGST: <span className="font-normal">[0.00]</span>
            </p>
            <p className="mb-2 font-semibold">
              Balance: <span className="font-normal">[0.00]</span>
            </p>
            <p className="mb-2 font-semibold">
              Total: <span className="font-normal">${summary.grandTotal}</span>
            </p>
          </div>
        </div>
      </div>
      <footer className="pt-4 text-center text-sm text-gray-600">
        <p>
          Thank you for shopping at{' '}
          <a
            href="https://rwt.nextwebstudio.net"
            className="font-medium text-blue-600 hover:underline"
          >
            https://rwt.nextwebstudio.net
          </a>
        </p>
        <p className="mt-2">Have a great day!</p>
        <p className="mt-4 text-xs text-gray-400">
          ** This is a computer-generated copy. No signatures required. **
        </p>
      </footer>
      <div className="my-6 flex justify-end">
        <Button onClick={handleDownloadInvoice} id="download-button">
          Download Invoice
        </Button>
      </div>
    </div>
  )
}

export default InvoicePDF
