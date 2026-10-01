const fs = require('node:fs');
const path = require('node:path');

const markets = [
  { id: 'TXW', name: 'West Texas' },
  { id: 'TXC', name: 'Central Texas' },
  { id: 'NM', name: 'New Mexico' },
  { id: 'AR', name: 'Arkansas' },
];
const cohortName = { established: 'Established', converted: 'Converted', new: 'New' };

const stores = Array.from({ length: 300 }, (_, i) => {
  const market = markets[Math.floor(i / 75)];
  const j = i % 75;
  const cohort = j % 15 < 12 ? 'established' : j % 15 < 14 ? 'converted' : 'new';
  const days = cohort === 'new' ? 21 : 28;
  const planInsideSales = (176000 + (j % 23) * 2500) * (days / 28) * (cohort === 'new' ? 0.82 : 1);
  const insideSales = planInsideSales * (0.965 + (i % 17) * 0.005 + (market.id === 'TXC' ? 0.012 : 0));
  const planFuelGallons = (127000 + (j % 19) * 3100) * days / 28;
  const fuelGallons = planFuelGallons * (0.956 + (i % 13) * 0.005);
  const planFuelMarginPerGallon = 0.302 + (j % 5) * 0.003;
  const fuelMarginPerGallon = planFuelMarginPerGallon - 0.009 + (i % 11) * 0.0015 - (i % 19 === 0 ? 0.034 : 0);
  const wasteRate = 0.017 + (i % 9) * 0.003;
  const foodSales = insideSales * (0.21 + (i % 7) * 0.005);
  const packagedBeverageSales = insideSales * 0.22;
  const tobaccoSales = insideSales * 0.26;
  const otherMerchandiseSales = insideSales - foodSales - packagedBeverageSales - tobaccoSales;
  const foodGrossProfit = foodSales * (0.54 - wasteRate);
  const packagedBeverageGrossProfit = packagedBeverageSales * (0.438 - (i % 5) * 0.002);
  const tobaccoGrossProfit = tobaccoSales * 0.172;
  const otherMerchandiseGrossProfit = otherMerchandiseSales * 0.329;
  const insideGrossProfit = foodGrossProfit + packagedBeverageGrossProfit + tobaccoGrossProfit + otherMerchandiseGrossProfit;
  const planInsideGrossProfit = planInsideSales * 0.356;
  const fuelGrossProfit = fuelGallons * fuelMarginPerGallon;
  const planFuelGrossProfit = planFuelGallons * planFuelMarginPerGallon;
  const planLaborCost = (31000 + (j % 9) * 480) * days / 28;
  const laborCost = planLaborCost * (1.008 + (i % 7) * 0.005);
  const planOtherCost = (10800 + (j % 11) * 170) * days / 28;
  const otherCost = planOtherCost * (0.98 + (i % 7) * 0.008);
  const planPaymentFees = (planInsideSales + planFuelGallons * 3.12) * 0.015;
  const paymentFees = (insideSales + fuelGallons * (2.95 + (i % 7) * 0.03)) * 0.0154;
  const controllableContribution = insideGrossProfit + fuelGrossProfit - laborCost - otherCost - paymentFees;
  const planControllableContribution = planInsideGrossProfit + planFuelGrossProfit - planLaborCost - planOtherCost - planPaymentFees;
  const priorYearInsideSales = cohort === 'established' ? insideSales / (1 + 0.008 + (i % 9) * 0.003) : 0;
  const priorYearTransactions = priorYearInsideSales / (8.8 + (i % 5) * 0.1);
  const insideTransactions = cohort === 'established' ? priorYearTransactions * (0.977 + (i % 8) * 0.004) : insideSales / 9.4;
  const priorYearFuelGallons = cohort === 'established' ? fuelGallons / (0.981 + (i % 7) * 0.004) : 0;
  const laborHours = laborCost / 21.5;
  const scheduledDispenserHours = 12 * 24 * days;
  const telemetryAvailable = i % 29 !== 0;
  const dispenserUptimeRate = i % 31 === 0 ? 0.945 : 0.984 + (i % 12) * 0.001;
  const priorityItemAudits = 240 + (i % 5) * 24;
  const priorityItemsAvailable = Math.round(priorityItemAudits * (0.946 + (i % 9) * 0.005));
  const identifiedFuelTransactions = Math.round(fuelGallons / 11 * 0.29);
  const linkedInsidePurchases = Math.round(identifiedFuelTransactions * (0.18 + (i % 8) * 0.013));
  const totalFuelTransactions = Math.round(fuelGallons / 11);
  const identifiedInsideTransactions = Math.round(insideTransactions * (0.30 + (i % 6) * 0.014));

  return {
    period_end: '2026-09-27', store_id: `${market.id}-${String(j + 1).padStart(3, '0')}`,
    market_id: market.id, market_name: market.name, district: `${market.id} D${Math.floor(j / 15) + 1}`,
    cohort: cohortName[cohort], open_days: days, inside_sales: insideSales, plan_inside_sales: planInsideSales,
    prior_year_inside_sales: priorYearInsideSales, inside_transactions: insideTransactions,
    prior_year_inside_transactions: priorYearTransactions, fuel_gallons: fuelGallons,
    plan_fuel_gallons: planFuelGallons, prior_year_fuel_gallons: priorYearFuelGallons,
    fuel_margin_per_gallon: fuelMarginPerGallon, plan_fuel_margin_per_gallon: planFuelMarginPerGallon,
    inside_gross_profit: insideGrossProfit, plan_inside_gross_profit: planInsideGrossProfit,
    fuel_gross_profit: fuelGrossProfit, plan_fuel_gross_profit: planFuelGrossProfit,
    labor_cost: laborCost, plan_labor_cost: planLaborCost, other_controllable_cost: otherCost,
    plan_other_controllable_cost: planOtherCost, payment_fees: paymentFees, plan_payment_fees: planPaymentFees,
    controllable_contribution: controllableContribution, plan_controllable_contribution: planControllableContribution,
    contribution_variance: controllableContribution - planControllableContribution,
    food_sales: foodSales, food_gross_profit: foodGrossProfit, food_waste_cost: foodSales * wasteRate,
    packaged_beverage_sales: packagedBeverageSales, packaged_beverage_gross_profit: packagedBeverageGrossProfit,
    tobacco_sales: tobaccoSales, tobacco_gross_profit: tobaccoGrossProfit,
    other_merchandise_sales: otherMerchandiseSales, other_merchandise_gross_profit: otherMerchandiseGrossProfit,
    paid_labor_hours: laborHours, scheduled_dispenser_hours: scheduledDispenserHours,
    dispenser_telemetry_available: telemetryAvailable, available_dispenser_hours: scheduledDispenserHours * dispenserUptimeRate,
    priority_item_audits: priorityItemAudits, priority_items_available: priorityItemsAvailable,
    total_fuel_transactions: totalFuelTransactions, identified_fuel_transactions: identifiedFuelTransactions,
    linked_inside_purchases: linkedInsidePurchases, identified_inside_transactions: identifiedInsideTransactions,
    average_inside_inventory_cost: insideGrossProfit * 0.57, monthly_inside_cogs: insideSales - insideGrossProfit,
  };
});

const headers = Object.keys(stores[0]);
const escape = value => {
  if (typeof value === 'number') return Number.isInteger(value) ? String(value) : value.toFixed(6).replace(/0+$/, '').replace(/\.$/, '');
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};
const csv = [headers.join(','), ...stores.map(row => headers.map(h => escape(row[h])).join(','))].join('\r\n') + '\r\n';
const outputDir = path.join(__dirname, 'data');
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, 'oxxo_synthetic_store_data.csv'), csv, 'utf8');

const totals = stores.reduce((a, s) => {
  a.contribution += s.controllable_contribution;
  a.plan += s.plan_controllable_contribution;
  a.insideSales += s.inside_sales;
  a.fuelGallons += s.fuel_gallons;
  return a;
}, { contribution: 0, plan: 0, insideSales: 0, fuelGallons: 0 });
console.log(JSON.stringify({ rows: stores.length, columns: headers.length, ...totals }));
