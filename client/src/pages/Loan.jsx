import { useState } from 'react';
import axios from 'axios';

function Loan() {
    const [formData, setFormData] = useState({ accountNumber: '', amount: '' });
    const [loans, setLoans] = useState([]);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [viewingStatus, setViewingStatus] = useState(false);

    const API_URL = 'http://localhost:8081/api/loans';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, {
                accountNumber: formData.accountNumber,
                amount: parseFloat(formData.amount)
            });
            setMessage({ type: 'success', text: 'Loan Application Submitted! Waiting for approval.' });
            setFormData({ ...formData, amount: '' });
        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: 'Application Failed. Check Account Number.' });
        }
    };

    const fetchLoans = async () => {
        if (!formData.accountNumber) return;
        try {
            const res = await axios.get(`${API_URL}/${formData.accountNumber}`);
            setLoans(res.data);
            setViewingStatus(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
                <h2 className="page-title">Apply for Loan</h2>
                <div className="card">
                    {message.text && (
                        <div style={{
                            padding: '1rem', marginBottom: '1rem', borderRadius: 'var(--radius)',
                            background: message.type === 'error' ? '#fef2f2' : '#f0fdf4',
                            color: message.type === 'error' ? 'var(--danger)' : 'var(--success)'
                        }}>
                            {message.text}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">Account Number</label>
                            <input
                                type="text"
                                className="input-field"
                                value={formData.accountNumber}
                                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Loan Amount</label>
                            <input
                                type="number"
                                className="input-field"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                required
                                min="1000"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Apply Now</button>
                    </form>
                </div>
            </div>

            <div>
                <h2 className="page-title">Check Status</h2>
                <div className="card glass-card">
                    <p style={{ marginBottom: '1rem' }}>Enter Account Number in the left form to check status.</p>
                    <button onClick={fetchLoans} className="btn btn-secondary" style={{ width: '100%', marginBottom: '1rem' }}>
                        Check Status
                    </button>

                    {viewingStatus && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {loans.length === 0 ? <p>No loan applications found.</p> : loans.map(loan => (
                                <div key={loan.id} style={{ padding: '1rem', background: 'white', borderRadius: 'var(--radius)', borderLeft: `4px solid ${loan.status === 'APPROVED' ? 'var(--success)' : loan.status === 'REJECTED' ? 'var(--danger)' : 'orange'}` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <strong>Loan #{loan.id}</strong>
                                        <span style={{ fontWeight: 600, color: loan.status === 'APPROVED' ? 'var(--success)' : loan.status === 'REJECTED' ? 'var(--danger)' : 'orange' }}>{loan.status}</span>
                                    </div>
                                    <div>Amount: ${loan.amount}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Date: {loan.applicationDate}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Loan;
