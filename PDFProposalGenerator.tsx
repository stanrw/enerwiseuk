import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Loader2 } from 'lucide-react';

interface ProposalData {
  address: string;
  systemSize: number;
  panelCount: number;
  annualYield: number;
  totalCost: number;
  paybackPeriod: number;
  co2Savings: number;
  panelBrand: string;
  panelModel: string;
}

interface PDFProposalGeneratorProps {
  proposalData: ProposalData;
  customerName?: string;
  installerName?: string;
}

export function PDFProposalGenerator({ 
  proposalData, 
  customerName = 'Homeowner',
  installerName = 'Enerwise Partner Installer'
}: PDFProposalGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Create a temporary div for PDF content
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '-9999px';
      tempDiv.style.width = '800px';
      tempDiv.style.padding = '40px';
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      
      tempDiv.innerHTML = `
        <div style="max-width: 720px; margin: 0 auto;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #22c55e; padding-bottom: 20px;">
            <h1 style="color: #22c55e; font-size: 32px; margin: 0;">Ener<span style="color: #374151;">wise</span></h1>
            <p style="color: #6b7280; font-size: 16px; margin: 10px 0 0 0;">Solar Installation Proposal</p>
          </div>

          <!-- Customer Info -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #374151; font-size: 20px; margin-bottom: 15px;">Proposal for ${customerName}</h2>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
              <p style="margin: 0; color: #374151;"><strong>Property Address:</strong> ${proposalData.address}</p>
              <p style="margin: 10px 0 0 0; color: #374151;"><strong>Date:</strong> ${new Date().toLocaleDateString('en-GB')}</p>
              <p style="margin: 10px 0 0 0; color: #374151;"><strong>Installer:</strong> ${installerName}</p>
            </div>
          </div>

          <!-- System Overview -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #374151; font-size: 20px; margin-bottom: 15px;">Recommended Solar System</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #22c55e;">
                <h3 style="color: #22c55e; font-size: 18px; margin: 0 0 10px 0;">System Specifications</h3>
                <p style="margin: 5px 0; color: #374151;"><strong>Panel Brand:</strong> ${proposalData.panelBrand}</p>
                <p style="margin: 5px 0; color: #374151;"><strong>Panel Model:</strong> ${proposalData.panelModel}</p>
                <p style="margin: 5px 0; color: #374151;"><strong>Number of Panels:</strong> ${proposalData.panelCount}</p>
                <p style="margin: 5px 0; color: #374151;"><strong>System Size:</strong> ${proposalData.systemSize} kW</p>
              </div>
              <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <h3 style="color: #3b82f6; font-size: 18px; margin: 0 0 10px 0;">Performance Estimates</h3>
                <p style="margin: 5px 0; color: #374151;"><strong>Annual Yield:</strong> ${proposalData.annualYield.toLocaleString()} kWh</p>
                <p style="margin: 5px 0; color: #374151;"><strong>CO₂ Savings:</strong> ${proposalData.co2Savings} tonnes/year</p>
                <p style="margin: 5px 0; color: #374151;"><strong>25-Year Savings:</strong> £${(proposalData.annualYield * 0.30 * 25).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <!-- Financial Summary -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #374151; font-size: 20px; margin-bottom: 15px;">Investment Summary</h2>
            <div style="background: #fefce8; padding: 20px; border-radius: 8px; border-left: 4px solid #eab308;">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; text-align: center;">
                <div>
                  <h3 style="color: #eab308; font-size: 24px; margin: 0;">£${proposalData.totalCost.toLocaleString()}</h3>
                  <p style="color: #374151; margin: 5px 0 0 0;">Total Investment</p>
                </div>
                <div>
                  <h3 style="color: #eab308; font-size: 24px; margin: 0;">${proposalData.paybackPeriod} years</h3>
                  <p style="color: #374151; margin: 5px 0 0 0;">Payback Period</p>
                </div>
                <div>
                  <h3 style="color: #eab308; font-size: 24px; margin: 0;">£${(proposalData.annualYield * 0.30).toLocaleString()}</h3>
                  <p style="color: #374151; margin: 5px 0 0 0;">Annual Savings</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Environmental Impact -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #374151; font-size: 20px; margin-bottom: 15px;">Environmental Benefits</h2>
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px;">
              <p style="color: #374151; margin: 0 0 10px 0;">Your solar system will make a significant positive impact on the environment:</p>
              <ul style="color: #374151; margin: 0; padding-left: 20px;">
                <li>Reduce CO₂ emissions by ${proposalData.co2Savings} tonnes annually</li>
                <li>Equivalent to planting ${Math.round(proposalData.co2Savings * 16)} trees per year</li>
                <li>Save ${Math.round(proposalData.co2Savings * 25)} tonnes of CO₂ over 25 years</li>
                <li>Generate clean, renewable energy for your home</li>
              </ul>
            </div>
          </div>

          <!-- Next Steps -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #374151; font-size: 20px; margin-bottom: 15px;">Next Steps</h2>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
              <ol style="color: #374151; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 10px;">Technical Survey: We'll conduct a detailed site survey to confirm system design</li>
                <li style="margin-bottom: 10px;">Planning Permission: We'll handle any required planning applications</li>
                <li style="margin-bottom: 10px;">Installation: Professional installation by MCS-certified engineers</li>
                <li style="margin-bottom: 10px;">Commissioning: System testing and grid connection</li>
                <li>Aftercare: Ongoing monitoring and maintenance support</li>
              </ol>
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Generated by Enerwise - Your trusted partner for renewable energy solutions</p>
            <p style="color: #6b7280; font-size: 12px; margin: 5px 0 0 0;">This proposal is valid for 30 days from the date of issue</p>
          </div>
        </div>
      `;

      document.body.appendChild(tempDiv);

      // Generate canvas from HTML
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      // Remove temporary div
      document.body.removeChild(tempDiv);

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Save the PDF
      const fileName = `Solar_Proposal_${proposalData.address.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Professional Proposal</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Generate a comprehensive PDF proposal document with all system details, 
          financial projections, and environmental benefits.
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">System Size:</span>
            <span className="ml-2 font-medium">{proposalData.systemSize} kW</span>
          </div>
          <div>
            <span className="text-gray-600">Annual Yield:</span>
            <span className="ml-2 font-medium">{proposalData.annualYield.toLocaleString()} kWh</span>
          </div>
          <div>
            <span className="text-gray-600">Investment:</span>
            <span className="ml-2 font-medium">£{proposalData.totalCost.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-gray-600">Payback:</span>
            <span className="ml-2 font-medium">{proposalData.paybackPeriod} years</span>
          </div>
        </div>

        <Button 
          onClick={generatePDF} 
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download Proposal PDF
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}