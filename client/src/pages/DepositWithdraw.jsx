import { useState } from 'react';
import axios from 'axios';

function DepositWithdraw() {
    const [activeTab, setActiveTab] = useState('deposit');
    const [formData, setFormData] = useState({
        accountNumber: '',
        amount: '',
        otp: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showOtp, setShowOtp] = useState(false);

    const API_URL = 'http://localhost:8081/api/accounts';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = (e) => {
        e.preventDefault();
        // Simulate OTP
        if (!formData.accountNumber || !formData.amount) {
            setMessage({ type: 'error', text: 'Please fill all fields' });
            return;
        }
        setMessage({ type: 'success', text: 'OTP sent to registered mobile number: 1234' });
        setShowOtp(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (formData.otp !== '1234') {
            setMessage({ type: 'error', text: 'Invalid OTP' });
            return;
        }

        try {
            const endpoint = activeTab === 'deposit' ? 'deposit' : 'withdraw';
            await axios.post(`${API_URL}/${formData.accountNumber}/${endpoint}`, {
                amount: parseFloat(formData.amount)
            });
            setMessage({ type: 'success', text: `${activeTab === 'deposit' ? 'Deposited' : 'Withdrawn'} Successfully!` });
            setShowOtp(false);
            setFormData({ ...formData, amount: '', otp: '' });
        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: err.response?.data?.message || 'Transaction Failed' });
        }
    };

    const TabButton = ({ name, label }) => (
        <button
            className={`btn ${activeTab === name ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setActiveTab(name); setMessage({ type: '', text: '' }); setShowOtp(false); }}
            style={{ flex: 1 }}
        >
            {label}
        </button>
    );

    return (
        <div className="animate-fade-in" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2 className="page-title" style={{ textAlign: 'center' }}>Banking Operations</h2>

            <div className="card">
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <TabButton name="deposit" label="Deposit" />
                    <TabButton name="withdraw" label="Withdraw" />
                </div>

                {message.text && (
                    <div style={{
                        padding: '1rem',
                        marginBottom: '1rem',
                        borderRadius: 'var(--radius)',
                        background: message.type === 'error' ? '#fef2f2' : '#f0fdf4',
                        color: message.type === 'error' ? 'var(--danger)' : 'var(--success)',
                        border: `1px solid ${message.type === 'error' ? '#fecaca' : '#bbf7d0'}`
                    }}>
                        {message.text}
                    </div>
                )}

                {!showOtp ? (
                    <form onSubmit={handleSendOtp}>
                        <div className="input-group">
                            <label className="input-label">Account Number</label>
                            <input
                                type="text"
                                name="accountNumber"
                                className="input-field"
                                value={formData.accountNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Amount</label>
                            <input
                                type="number"
                                name="amount"
                                className="input-field"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                min="1"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                            Proceed
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">Enter OTP</label>
                            <input
                                type="text"
                                name="otp"
                                className="input-field"
                                value={formData.otp}
                                onChange={handleChange}
                                required
                                placeholder="Enter 1234"
                            />
                        </div>
                        <button type="submit" className={`btn ${activeTab === 'deposit' ? 'btn-success' : 'btn-danger'}`} style={{ width: '100%', background: activeTab === 'withdraw' ? 'var(--danger)' : 'var(--success)', color: 'white' }}>
                            Confirm {activeTab === 'deposit' ? 'Deposit' : 'Withdrawal'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default DepositWithdraw;
