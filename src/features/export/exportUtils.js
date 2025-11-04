import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Exportar transacciones a CSV
 */
export const exportToCSV = (incomes, expenses, dateRange) => {
  // Combinar y formatear datos
  const allTransactions = [
    ...incomes.map(i => ({
      Fecha: new Date(i.date).toLocaleDateString('es-ES'),
      Tipo: 'Ingreso',
      Descripción: i.description,
      Categoría: '-',
      Monto: i.amount,
    })),
    ...expenses.map(e => ({
      Fecha: new Date(e.date).toLocaleDateString('es-ES'),
      Tipo: 'Gasto',
      Descripción: e.description,
      Categoría: e.category,
      Monto: -e.amount, // Negativo para gastos
    })),
  ].sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha));

  // Convertir a CSV
  const csv = Papa.unparse(allTransactions, {
    quotes: true,
    header: true,
  });

  // Descargar archivo
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `presupuesto_${dateRange.start}_${dateRange.end}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Exportar reporte a PDF
 */
export const exportToPDF = async (incomes, expenses, categoryAnalysis, totals, dateRange, includeCharts) => {
  const doc = new jsPDF();
  
  // Configuración de colores
  const primaryColor = [99, 102, 241]; // Indigo
  const successColor = [16, 185, 129]; // Green
  const dangerColor = [239, 68, 68]; // Red
  
  // Título del documento
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont(undefined, 'bold');
  doc.text('REPORTE FINANCIERO', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text(
    `Periodo: ${new Date(dateRange.start).toLocaleDateString('es-ES')} - ${new Date(dateRange.end).toLocaleDateString('es-ES')}`,
    105,
    30,
    { align: 'center' }
  );
  
  // Resumen financiero
  let yPos = 50;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Resumen Financiero', 14, yPos);
  
  yPos += 10;
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  
  // Cajas de resumen
  const boxWidth = 60;
  const boxHeight = 20;
  const spacing = 5;
  
  // Ingresos
  doc.setFillColor(220, 252, 231); // Light green
  doc.rect(14, yPos, boxWidth, boxHeight, 'F');
  doc.setTextColor(...successColor);
  doc.setFont(undefined, 'bold');
  doc.text('Ingresos', 16, yPos + 8);
  doc.setFontSize(14);
  doc.text(`$${totals.totalIncome.toFixed(2)}`, 16, yPos + 16);
  
  // Gastos
  doc.setFillColor(254, 226, 226); // Light red
  doc.rect(14 + boxWidth + spacing, yPos, boxWidth, boxHeight, 'F');
  doc.setTextColor(...dangerColor);
  doc.setFont(undefined, 'bold');
  doc.setFontSize(12);
  doc.text('Gastos', 16 + boxWidth + spacing, yPos + 8);
  doc.setFontSize(14);
  doc.text(`$${totals.totalExpenses.toFixed(2)}`, 16 + boxWidth + spacing, yPos + 16);
  
  // Balance
  const balanceColor = totals.balance >= 0 ? successColor : dangerColor;
  const balanceBg = totals.balance >= 0 ? [220, 252, 231] : [254, 226, 226];
  doc.setFillColor(...balanceBg);
  doc.rect(14 + (boxWidth + spacing) * 2, yPos, boxWidth, boxHeight, 'F');
  doc.setTextColor(...balanceColor);
  doc.setFont(undefined, 'bold');
  doc.setFontSize(12);
  doc.text('Balance', 16 + (boxWidth + spacing) * 2, yPos + 8);
  doc.setFontSize(14);
  doc.text(`$${totals.balance.toFixed(2)}`, 16 + (boxWidth + spacing) * 2, yPos + 16);
  
  yPos += boxHeight + 15;
  
  // Gastos por categoría
  if (categoryAnalysis.length > 0) {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Gastos por Categoría', 14, yPos);
    yPos += 5;
    
    const categoryData = categoryAnalysis.map(cat => [
      cat.category,
      `$${cat.amount.toFixed(2)}`,
      `${cat.percentage.toFixed(1)}%`,
    ]);
    
    doc.autoTable({
      startY: yPos,
      head: [['Categoría', 'Monto', 'Porcentaje']],
      body: categoryData,
      theme: 'grid',
      headStyles: {
        fillColor: primaryColor,
        fontSize: 10,
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 9,
      },
    });
    
    yPos = doc.lastAutoTable.finalY + 15;
  }
  
  // Tabla de transacciones
  if (yPos > 200) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Detalle de Transacciones', 14, yPos);
  yPos += 5;
  
  // Preparar datos
  const transactionData = [
    ...incomes.map(i => [
      new Date(i.date).toLocaleDateString('es-ES'),
      'Ingreso',
      i.description,
      '-',
      `$${i.amount.toFixed(2)}`,
    ]),
    ...expenses.map(e => [
      new Date(e.date).toLocaleDateString('es-ES'),
      'Gasto',
      e.description,
      e.category,
      `-$${e.amount.toFixed(2)}`,
    ]),
  ].sort((a, b) => new Date(b[0]) - new Date(a[0]));
  
  doc.autoTable({
    startY: yPos,
    head: [['Fecha', 'Tipo', 'Descripción', 'Categoría', 'Monto']],
    body: transactionData,
    theme: 'striped',
    headStyles: {
      fillColor: primaryColor,
      fontSize: 9,
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 20 },
      2: { cellWidth: 65 },
      3: { cellWidth: 30 },
      4: { cellWidth: 25, halign: 'right' },
    },
  });
  
  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Página ${i} de ${pageCount}`,
      105,
      290,
      { align: 'center' }
    );
    doc.text(
      `Generado el ${new Date().toLocaleDateString('es-ES')}`,
      14,
      290
    );
  }
  
  // Descargar PDF
  doc.save(`reporte_financiero_${dateRange.start}_${dateRange.end}.pdf`);
};
