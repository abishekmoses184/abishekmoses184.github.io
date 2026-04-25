// Vercel Speed Insights initialization
// This script initializes the Speed Insights tracking queue
// The actual tracking script will be injected by Vercel when Speed Insights is enabled in the dashboard

window.si = window.si || function () { 
  (window.siq = window.siq || []).push(arguments); 
};
