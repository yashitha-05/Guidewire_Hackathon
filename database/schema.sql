-- GigShield Parametric Insurance Database Schema
-- PostgreSQL 15+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    aadhaar_number VARCHAR(255), -- Encrypted
    delivery_platform VARCHAR(50) CHECK (delivery_platform IN ('Zepto', 'Blinkit', 'Swiggy')),
    primary_location JSONB, -- {city, lat, lng}
    wallet_details JSONB, -- {upi_id, bank_account}
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    kyc_status VARCHAR(20) DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'rejected')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Policies table
CREATE TABLE policies (
    policy_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    week_start_date DATE NOT NULL,
    week_end_date DATE NOT NULL,
    risk_score DECIMAL(5,2) CHECK (risk_score >= 0 AND risk_score <= 100),
    premium_amount DECIMAL(10,2) NOT NULL,
    coverage_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired', 'cancelled')),
    payment_transaction_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, week_start_date)
);

-- Premium calculations table
CREATE TABLE premium_calculations (
    calculation_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    week_date DATE NOT NULL,
    base_risk_score DECIMAL(5,2),
    weather_risk_factor DECIMAL(5,2),
    pollution_risk_factor DECIMAL(5,2),
    location_multiplier DECIMAL(5,2),
    final_premium DECIMAL(10,2),
    calculation_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Claims table
CREATE TABLE claims (
    claim_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    policy_id UUID NOT NULL REFERENCES policies(policy_id) ON DELETE CASCADE,
    trigger_type VARCHAR(50) NOT NULL CHECK (trigger_type IN ('weather', 'pollution', 'regulatory')),
    trigger_value JSONB, -- Actual measurement data
    trigger_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    payout_amount DECIMAL(10,2) NOT NULL,
    payout_transaction_id VARCHAR(255),
    status VARCHAR(20) DEFAULT 'processed' CHECK (status IN ('processed', 'pending', 'failed', 'rejected')),
    fraud_score DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Payout records table
CREATE TABLE payout_records (
    payout_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_id UUID NOT NULL REFERENCES claims(claim_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'UPI',
    transaction_reference VARCHAR(255) UNIQUE,
    payout_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'success' CHECK (status IN ('success', 'failed', 'pending', 'cancelled'))
);

-- Disruption logs table
CREATE TABLE disruption_logs (
    log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location JSONB NOT NULL, -- {lat, lng, city, radius_km}
    disruption_type VARCHAR(50) NOT NULL,
    severity_level VARCHAR(20) DEFAULT 'moderate' CHECK (severity_level IN ('low', 'moderate', 'high', 'critical')),
    start_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    end_timestamp TIMESTAMP WITH TIME ZONE,
    affected_radius_km DECIMAL(5,2),
    weather_data JSONB,
    pollution_data JSONB,
    regulatory_data JSONB,
    source VARCHAR(50) DEFAULT 'api',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_policies_user_id ON policies(user_id);
CREATE INDEX idx_policies_week_dates ON policies(week_start_date, week_end_date);
CREATE INDEX idx_claims_user_id ON claims(user_id);
CREATE INDEX idx_claims_policy_id ON claims(policy_id);
CREATE INDEX idx_claims_trigger_timestamp ON claims(trigger_timestamp);
CREATE INDEX idx_payout_records_claim_id ON payout_records(claim_id);
CREATE INDEX idx_disruption_logs_location ON disruption_logs USING GIN(location);
CREATE INDEX idx_disruption_logs_timestamps ON disruption_logs(start_timestamp, end_timestamp);

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_policies_updated_at BEFORE UPDATE ON policies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_claims_updated_at BEFORE UPDATE ON claims FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();