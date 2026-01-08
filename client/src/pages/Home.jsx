import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="animate-fade-in">
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                    Banking Made <span style={{ color: 'var(--primary)' }}>Simple</span> & <span style={{ color: 'var(--accent)' }}>Beautiful</span>.
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-light)', maxWidth: '700px', margin: '0 auto 3rem' }}>
                    Experience the next generation of banking. Secure, fast, and delightful to use. Open an account today with just $500.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/create-account" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                        Open Account Now
                    </Link>
                    <Link to="/banking" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                        Existing User
                    </Link>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
                <div className="card glass-card">
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💰</div>
                    <h3>Easy Deposits</h3>
                    <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>
                        Instantly deposit funds into your account with our secure payment gateway simulation.
                    </p>
                </div>
                <div className="card glass-card">
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💸</div>
                    <h3>Quick Loans</h3>
                    <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>
                        Apply for loans and get quick approvals. Track your status in real-time.
                    </p>
                </div>
                <div className="card glass-card">
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📊</div>
                    <h3>Detailed Statements</h3>
                    <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>
                        View and download your transaction history with date-range filtering.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;
