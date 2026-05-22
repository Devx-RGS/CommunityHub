window.onload = function () {
    console.log('PDF Generator script loaded');
    
    // Test if html2pdf is available
    if (typeof html2pdf === 'undefined') {
        console.error('html2pdf library not loaded');
        return;
    }
    console.log('html2pdf library is available');
    // Download Receipt functionality
    const downloadReceiptBtn = document.getElementById("download-receipt");
    if (downloadReceiptBtn) {
        downloadReceiptBtn.addEventListener("click", () => {
            const invoice = document.getElementById("receipt");
            if (invoice) {
                try {
                    // Create a temporary container for the receipt
                    const tempContainer = document.createElement('div');
                    tempContainer.style.cssText = `
                        background: white;
                        color: black;
                        padding: 20px;
                        font-family: Arial, sans-serif;
                        font-size: 14px;
                        line-height: 1.6;
                        max-width: 800px;
                        margin: 0 auto;
                        box-sizing: border-box;
                    `;
                    
                    // Clone and clean up the receipt content
                    const clonedReceipt = invoice.cloneNode(true);
                    const elementsToStyle = clonedReceipt.querySelectorAll('*');
                    elementsToStyle.forEach(el => {
                        // Remove dark theme styles
                        el.style.removeProperty('background-image');
                        el.style.removeProperty('box-shadow');
                        el.style.removeProperty('backdrop-filter');
                        
                        // Set colors for PDF
                        if (el.style.color) {
                            el.style.color = 'black';
                        }
                        if (el.style.backgroundColor) {
                            el.style.backgroundColor = 'white';
                        }
                        
                        // Clean up table styles
                        if (el.tagName === 'TABLE') {
                            el.style.cssText = 'width: 100%; border-collapse: collapse; color: black; border: 1px solid #ddd;';
                        }
                        if (el.tagName === 'TD' || el.tagName === 'TH') {
                            el.style.cssText = 'padding: 8px; border: 1px solid #ddd; color: black; text-align: left;';
                        }
                    });
                    
                    tempContainer.appendChild(clonedReceipt);
                    document.body.appendChild(tempContainer);
                    
                    var opt = {
                        margin: [0.5, 0.5, 0.5, 0.5],
                        filename: 'payment_receipt.pdf',
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: { 
                            scale: 2,
                            useCORS: true,
                            allowTaint: false,
                            backgroundColor: '#ffffff'
                        },
                        jsPDF: { 
                            unit: 'in', 
                            format: 'a4', 
                            orientation: 'portrait' 
                        }
                    };
                    
                    html2pdf().set(opt).from(tempContainer).save().then(() => {
                        // Clean up
                        document.body.removeChild(tempContainer);
                        console.log('Receipt PDF generated successfully');
                    }).catch(error => {
                        console.error('Error generating receipt PDF:', error);
                        document.body.removeChild(tempContainer);
                        alert('Error generating receipt PDF. Please try again.');
                    });
                    
                } catch (error) {
                    console.error('Error generating receipt PDF:', error);
                    alert('Error generating receipt PDF. Please try again.');
                }
            } else {
                console.error('Receipt element not found');
                alert('Error: Receipt content not found. Please refresh the page and try again.');
            }
        });
    }
    
    // Download Bill functionality
    const downloadBtn = document.getElementById("download-btn");
    console.log('Download button found:', !!downloadBtn);
    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            console.log('Download button clicked');
            const invoice = document.getElementById("print-content");
            console.log('Print content element found:', !!invoice);
            if (invoice) {
                try {
                    // Create a temporary container with clean styling that maintains bill layout
                    const tempContainer = document.createElement('div');
                    tempContainer.style.cssText = `
                        background: white;
                        color: black;
                        padding: 30px;
                        font-family: Arial, sans-serif;
                        font-size: 14px;
                        line-height: 1.6;
                        width: 100%;
                        max-width: 800px;
                        margin: 0 auto;
                        box-sizing: border-box;
                    `;
                    
                    // Clone the content and apply print-friendly styles
                    const clonedContent = invoice.cloneNode(true);
                    
                    // Hide action buttons during PDF generation
                    // Method 1: Target the container by class
                    const actionButtons = clonedContent.querySelector('.d-flex.flex-wrap.gap-3.justify-content-center.mt-4');
                    if (actionButtons) {
                        actionButtons.style.display = 'none';
                        console.log('Action buttons container hidden for PDF generation');
                    } else {
                        // Method 2: Try alternative selectors
                        const alternativeSelectors = [
                            '.d-flex.gap-3.justify-content-center.mt-4',
                            '.d-flex[class*="gap-3"][class*="justify-content-center"][class*="mt-4"]',
                            'div[class*="d-flex"][class*="gap-3"]:has(button[id*="download"])',
                            'div:has(button[id="download-btn"])'
                        ];
                        
                        for (const selector of alternativeSelectors) {
                            const buttons = clonedContent.querySelector(selector);
                            if (buttons) {
                                buttons.style.display = 'none';
                                console.log('Action buttons found and hidden with selector:', selector);
                                break;
                            }
                        }
                    }
                    
                    // Method 3: Directly target individual buttons as fallback
                    const downloadBtn = clonedContent.querySelector('#download-btn');
                    const payBtn = clonedContent.querySelector('#pay-btn');
                    const editBillBtn = clonedContent.querySelector('a[href="/editBill"]');
                    
                    if (downloadBtn) {
                        downloadBtn.style.display = 'none';
                        console.log('Download button hidden');
                    }
                    if (payBtn) {
                        payBtn.style.display = 'none';
                        console.log('Pay button hidden');
                    }
                    if (editBillBtn) {
                        editBillBtn.style.display = 'none';
                        console.log('Edit bill button hidden');
                    }
                    
                    // Method 4: Hide any remaining buttons with specific classes
                    const allActionButtons = clonedContent.querySelectorAll('button.btn-modern-primary, button.btn-pastel-success, a.btn-pastel-warning');
                    allActionButtons.forEach(btn => {
                        btn.style.display = 'none';
                        console.log('Additional action button hidden');
                    });
                    
                    // Hide accounting section from PDF (admin-only content)
                    const accountingSections = clonedContent.querySelectorAll('.content-card.mt-4');
                    accountingSections.forEach(section => {
                        const titleSpan = section.querySelector('.card-title span');
                        if (titleSpan && titleSpan.textContent.includes('Accounting Overview')) {
                            section.style.display = 'none';
                            console.log('Accounting section hidden from PDF');
                        }
                    });
                    
                    // Clean up the cloned content for PDF
                    const elementsToStyle = clonedContent.querySelectorAll('*');
                    elementsToStyle.forEach(el => {
                        // Remove ALL problematic styles
                        el.style.removeProperty('background-image');
                        el.style.removeProperty('box-shadow');
                        el.style.removeProperty('backdrop-filter');
                        el.style.removeProperty('border-radius');
                        el.style.removeProperty('text-shadow');
                        el.style.removeProperty('opacity');
                        el.style.removeProperty('filter');
                        
                        // Force black text color for ALL elements
                        el.style.color = '#000000 !important';
                        el.style.setProperty('color', '#000000', 'important');
                        
                        // Remove any CSS classes that might affect visibility
                        if (el.classList.contains('text-white')) {
                            el.classList.remove('text-white');
                        }
                        if (el.classList.contains('text-light')) {
                            el.classList.remove('text-light');
                        }
                        if (el.classList.contains('text-muted')) {
                            el.classList.remove('text-muted');
                        }
                        
                        // Handle specific elements with explicit styling to maintain bill appearance
                        if (el.classList.contains('content-card')) {
                            el.style.cssText = 'background: white !important; color: #000000 !important; border: 1px solid #ddd !important; padding: 20px !important; margin-bottom: 20px !important; border-radius: 8px !important; page-break-inside: avoid !important; break-inside: avoid !important;';
                        }
                        if (el.classList.contains('card-header')) {
                            el.style.cssText = 'background: #f8f9fa !important; color: #000000 !important; padding: 15px 20px !important; border-bottom: 2px solid #dee2e6 !important; margin-bottom: 20px !important; font-weight: bold !important; border-radius: 8px 8px 0 0 !important;';
                        }
                        if (el.classList.contains('table')) {
                            el.style.cssText = 'width: 100% !important; border-collapse: collapse !important; color: #000000 !important; border: 1px solid #ddd !important; margin-bottom: 20px !important; page-break-inside: avoid !important; break-inside: avoid !important;';
                        }
                        if (el.tagName === 'TH') {
                            el.style.cssText = 'background: #e9ecef !important; color: #000000 !important; padding: 12px 15px !important; border: 1px solid #ddd !important; font-weight: bold !important; text-align: left !important; font-size: 14px !important;';
                        }
                        if (el.tagName === 'TD') {
                            el.style.cssText = 'padding: 10px 15px !important; border: 1px solid #ddd !important; color: #000000 !important; background: white !important; font-size: 14px !important;';
                        }
                        if (el.classList.contains('info-item')) {
                            el.style.cssText = 'background: #f8f9fa !important; color: #000000 !important; padding: 12px 15px !important; border: 1px solid #e9ecef !important; margin-bottom: 10px !important; border-radius: 4px !important; display: flex !important; justify-content: space-between !important; align-items: center !important; page-break-inside: avoid !important; break-inside: avoid !important;';
                        }
                        if (el.classList.contains('card-title')) {
                            el.style.cssText = 'color: #000000 !important; font-weight: bold !important; font-size: 20px !important; margin-bottom: 5px !important;';
                        }
                        if (el.classList.contains('card-description')) {
                            el.style.cssText = 'color: #6c757d !important; font-size: 14px !important; margin-bottom: 0 !important;';
                        }
                        if (el.classList.contains('value')) {
                            el.style.cssText = 'color: #000000 !important; font-weight: 600 !important; font-size: 14px !important;';
                        }
                        if (el.tagName === 'LABEL') {
                            el.style.cssText = 'color: #495057 !important; font-weight: 500 !important; font-size: 14px !important; margin: 0 !important;';
                        }
                        if (el.classList.contains('modern-table')) {
                            el.style.cssText = 'background: white !important; border-radius: 8px !important; overflow: hidden !important; box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important; border: 1px solid #ddd !important; page-break-inside: avoid !important; break-inside: avoid !important;';
                        }
                        if (el.classList.contains('table-warning')) {
                            el.style.cssText = 'background: #fff3cd !important; color: #856404 !important;';
                        }
                        if (el.classList.contains('table-success')) {
                            el.style.cssText = 'background: #d4edda !important; color: #155724 !important;';
                        }
                        if (el.classList.contains('table-responsive')) {
                            el.style.cssText = 'page-break-inside: avoid !important; break-inside: avoid !important; overflow-x: visible !important;';
                        }
                        
                        // Ensure headings are visible
                        if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(el.tagName)) {
                            el.style.cssText = 'color: #000000 !important; font-weight: bold !important;';
                        }
                        
                        // Handle paragraphs and spans
                        if (['P', 'SPAN', 'DIV'].includes(el.tagName)) {
                            el.style.color = '#000000';
                            el.style.setProperty('color', '#000000', 'important');
                        }
                    });
                    
                    tempContainer.appendChild(clonedContent);
                    document.body.appendChild(tempContainer);
                    
                    // Add CSS for better page breaks
                    const style = document.createElement('style');
                    style.textContent = `
                        @media print {
                            .content-card {
                                page-break-inside: avoid !important;
                                break-inside: avoid !important;
                            }
                            .modern-table {
                                page-break-inside: avoid !important;
                                break-inside: avoid !important;
                            }
                            .card-header {
                                page-break-after: avoid !important;
                                break-after: avoid !important;
                            }
                            .table-responsive {
                                page-break-inside: avoid !important;
                                break-inside: avoid !important;
                            }
                            .info-item {
                                page-break-inside: avoid !important;
                                break-inside: avoid !important;
                            }
                            .alert {
                                page-break-inside: avoid !important;
                                break-inside: avoid !important;
                            }
                        }
                    `;
                    tempContainer.appendChild(style);

                    var opt = {
                        margin: [0.5, 0.5, 0.5, 0.5],
                        filename: 'maintenance_bill.pdf',
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: { 
                            scale: 2,
                            useCORS: true,
                            allowTaint: false,
                            backgroundColor: '#ffffff',
                            scrollX: 0,
                            scrollY: 0,
                            windowWidth: 1200,
                            windowHeight: 1000,
                            logging: false,
                            letterRendering: true
                        },
                        jsPDF: { 
                            unit: 'in', 
                            format: 'a4', 
                            orientation: 'portrait',
                            compressPDF: true,
                            putOnlyUsedFonts: true,
                            precision: 2
                        },
                        pagebreak: { 
                            mode: ['avoid-all', 'css'],
                            before: '.page-break-before',
                            after: '.page-break-after',
                            avoid: ['.content-card', '.modern-table', '.card-header', '.table-responsive', '.info-item', '.alert']
                        }
                    };
                    
                    html2pdf().set(opt).from(tempContainer).save().then(() => {
                        // Clean up temporary container
                        document.body.removeChild(tempContainer);
                        console.log('PDF generated successfully');
                    }).catch(error => {
                        console.error('Error generating PDF:', error);
                        document.body.removeChild(tempContainer);
                        
                        // Try with different settings as fallback
                        console.log('Trying with fallback settings...');
                        const fallbackContainer = tempContainer.cloneNode(true);
                        document.body.appendChild(fallbackContainer);
                        
                        const fallbackOpt = {
                            margin: [0.5, 0.5, 0.5, 0.5],
                            filename: 'maintenance_bill.pdf',
                            image: { type: 'jpeg', quality: 0.95 },
                            html2canvas: { 
                                scale: 1.5,
                                useCORS: true,
                                allowTaint: false,
                                backgroundColor: '#ffffff',
                                logging: false
                            },
                            jsPDF: { 
                                unit: 'in', 
                                format: 'a4', 
                                orientation: 'portrait'
                            }
                        };
                        
                        html2pdf().set(fallbackOpt).from(fallbackContainer).save().then(() => {
                            document.body.removeChild(fallbackContainer);
                            console.log('PDF generated with fallback settings');
                        }).catch(fallbackError => {
                            console.error('Fallback PDF generation failed:', fallbackError);
                            document.body.removeChild(fallbackContainer);
                            // Final fallback to print dialog
                            console.log('Falling back to print dialog');
                            window.print();
                        });
                    });
                    
                } catch (error) {
                    console.error('Error generating PDF:', error);
                    // Fallback to print dialog
                    console.log('Falling back to print dialog');
                    window.print();
                }
            } else {
                console.error('Print content element not found');
                alert('Error: Bill content not found. Please refresh the page and try again.');
            }
        });
    }
}