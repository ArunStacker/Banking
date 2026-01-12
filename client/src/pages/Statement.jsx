import { useState } from 'react';
import axios from 'axios';

function Statement() {
    const [formData, setFormData] = useState({ accountNumber: '', startDate: '', endDate: '' });
    const [transactions, setTransactions] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    // Helper to format local datetime string roughly for java
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Java expects ISO format, html date input gives yyyy-mm-dd
        // We'll append time to make it LocalDateTime compatible
        const start = `${formData.startDate}T00:00:00`;
        const end = `${formData.endDate}T23:59:59`;

        try {
            const res = await axios.get(`https://bankingdb-production.up.railway.app/api/accounts/${formData.accountNumber}/statement?startDate=${start}&endDate=${end}`);
            setTransactions(res.data);
            setHasSearched(true);
        } catch (err) {
            console.error(err);
            alert('Failed to fetch statement. Check Account Number.');
        }
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="page-title">Generate Statement</h2>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">Account Number</label>
                        <input
                            type="text"
                            className="input-field"
                            value={formData.accountNumber}
                            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">From Date</label>
                        <input
                            type="date"
                            className="input-field"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label">To Date</label>
                        <input
                            type="date"
                            className="input-field"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ height: '46px' }}>Generate</button>
                </form>
            </div>

            {hasSearched && (
                <div className="card glass-card">
                    <h3>Transaction History</h3>
                    <div style={{ marginTop: '1rem' }}>
                        {transactions.length === 0 ? <p>No transactions found for this period.</p> : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                                        <th style={{ padding: '0.75rem' }}>Date</th>
                                        <th style={{ padding: '0.75rem' }}>Type</th>
                                        <th style={{ padding: '0.75rem' }}>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map(tx => (
                                        <tr key={tx.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <td style={{ padding: '0.75rem' }}>{new Date(tx.timestamp).toLocaleDateString()}</td>
                                            <td style={{ padding: '0.75rem' }}>{tx.type}</td>
                                            <td style={{ padding: '0.75rem', color: tx.type === 'DEPOSIT' ? 'var(--success)' : 'var(--danger)', fontWeight: 'bold' }}>
                                                {tx.type === 'DEPOSIT' ? '+' : ''}${Math.abs(tx.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Statement;
