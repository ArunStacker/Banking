import { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
    const [accounts, setAccounts] = useState([]);
    const [loans, setLoans] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('accounts');

    const API_URL = 'http://localhost:8081/api/admin';

    useEffect(() => {
        fetchAccounts();
        fetchLoans();
    }, []);

    const fetchAccounts = async () => {
        try {
            const res = await axios.get(`${API_URL}/accounts`);
            setAccounts(res.data);
        } catch (err) { console.error(err); }
    };

    const fetchLoans = async () => {
        try {
            const res = await axios.get(`${API_URL}/loans`);
            setLoans(res.data);
        } catch (err) { console.error(err); }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery) {
            fetchAccounts(); // Reset
            return;
        }
        try {
            const res = await axios.get(`${API_URL}/accounts/search?accountNumber=${searchQuery}`);
            setAccounts(res.data);
        } catch (err) { console.error(err); }
    };

    const updateLoanStatus = async (id, status) => {
        try {
            await axios.put(`${API_URL}/loans/${id}`, { status });
            fetchLoans(); // Refresh
        } catch (err) { console.error(err); }
    };

    return (
        <div className="animate-fade-in">
            <h2 className="page-title">Office Use Dashboard</h2>

            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <button className={`btn ${activeTab === 'accounts' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('accounts')}>
                    Manage Accounts
                </button>
                <button className={`btn ${activeTab === 'loans' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('loans')}>
                    Manage Loans
                </button>
            </div>

            {activeTab === 'accounts' && (
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                        <h3>All Accounts</h3>
                        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="text"
                                placeholder="Filter by Account No."
                                className="input-field"
                                style={{ padding: '0.5rem', width: '200px' }}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Search</button>
                        </form>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>Account No</th>
                                    <th style={{ padding: '1rem' }}>Owner</th>
                                    <th style={{ padding: '1rem' }}>Balance</th>
                                    <th style={{ padding: '1rem' }}>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.map(acc => (
                                    <tr key={acc.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '1rem' }}>{acc.accountNumber}</td>
                                        <td style={{ padding: '1rem' }}>{acc.user.name}</td>
                                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>${acc.balance}</td>
                                        <td style={{ padding: '1rem' }}>{acc.accountType}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'loans' && (
                <div className="card">
                    <h3>Loan Applications</h3>
                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {loans.map(loan => (
                            <div key={loan.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: 'var(--radius)' }}>
                                <div>
                                    <div><strong>Account:</strong> {loan.account.accountNumber}</div>
                                    <div><strong>Amount:</strong> ${loan.amount}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Status: {loan.status}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {loan.status === 'PENDING' && (
                                        <>
                                            <button onClick={() => updateLoanStatus(loan.id, 'APPROVED')} className="btn btn-primary" style={{ background: 'var(--success)', padding: '0.5rem 1rem' }}>Approve</button>
                                            <button onClick={() => updateLoanStatus(loan.id, 'REJECTED')} className="btn btn-danger" style={{ padding: '0.5rem 1rem' }}>Reject</button>
                                        </>
                                    )}
                                    {loan.status !== 'PENDING' && <span style={{ padding: '0.5rem 1rem', background: '#f1f5f9', borderRadius: 'var(--radius)' }}>{loan.status}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;
