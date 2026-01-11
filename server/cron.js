import cron from 'node-cron';
import { updateBalances } from './services/balanceUpdater.js';

// Schedule the balance update to run once hourly
const start = () => {
    console.log('Scheduling hourly balance update for bot investments...');
    cron.schedule('0 * * * *', updateBalances, {
        scheduled: true,
        timezone: "UTC"
    });
};

export default { start };
