import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateAccount() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        initialDeposit: 500
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Use environment variable for API URL in real apps, here hardcoded for demo
    const API_URL = 'http://localhost:8081/api/accounts';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (formData.initialDeposit < 500) {
            setError('Minimum deposit amount is 500.');
            return;
        }

        try {
            const response = await axios.post(API_URL, formData);
            setSuccess(`Account Created Successfully! Your Account Number is: ${response.data.accountNumber}`);
            // setTimeout(() => navigate('/banking'), 3000); // Redirect option
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || err.response?.data || err.message || 'Failed to create account. Please try again.';
            setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
        }
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="page-title">Open New Account</h2>

            <div className="card">
                {error && (
                    <div style={{ padding: '1rem', background: '#fef2f2', color: 'var(--danger)', borderRadius: 'var(--radius)', marginBottom: '1rem', border: '1px solid #fecaca' }}>
                        {error}
                    </div>
                )}
                {success && (
                    <div style={{ padding: '1rem', background: '#f0fdf4', color: 'var(--success)', borderRadius: 'var(--radius)', marginBottom: '1rem', border: '1px solid #bbf7d0' }}>
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="input-field"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="input-group">
                            <label className="input-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="input-field"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                className="input-field"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Address</label>
                        <input
                            type="text"
                            name="address"
                            className="input-field"
                            required
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input-field"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Initial Deposit (Min 500)</label>
                        <input
                            type="number"
                            name="initialDeposit"
                            className="input-field"
                            required
                            min="500"
                            value={formData.initialDeposit}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateAccount;
