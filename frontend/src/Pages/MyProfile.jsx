import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { jwtDecode } from "jwt-decode";

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState();

  const activeRentals = [
    {
      id: 'ORD-8821',
      title: 'Nordic 3-Seater Fabric Sofa (Sage Green)',
      tenure: '6 Months',
      monthlyRent: '₹1,499/mo',
      nextBilling: '05 Sep 2026',
      status: 'Active'
    },
    {
      id: 'ORD-9012',
      title: 'Minimalist Solid Oak Coffee Table',
      tenure: '12 Months',
      monthlyRent: '₹499/mo',
      nextBilling: '12 Sep 2026',
      status: 'Active'
    }
  ];

  const colors = {
    bgLight: '#FBF9F5',
    darkGreen: '#2D4430',
    primaryGreen: '#344E36',
    accentLight: '#E8EFE9',
    textDark: '#1E2E20',
    textMuted: '#5D6F5E',
    borderLight: '#ECE7DF'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("name from handleInputChange : ", name)
    console.log("value from handleInputChange : ", value)
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const loginUser = localStorage.getItem("login-user") ? jwtDecode(localStorage.getItem("login-user")) : {}
    setUserData(loginUser)
  }, [])

  return (
    <div style={{ backgroundColor: colors.bgLight, minHeight: '100vh', display: 'flex', flexDirection: 'column', color: colors.textDark }}>

      {/* Navbar / Brand Header */}
      <NavBar />

      {/* Main Content Area */}
      <main className="container py-5 flex-grow-1">
        <div className="row g-5 align-items-start">

          {/* Left Column: Welcome & Status Overview */}
          <div className="col-12 col-lg-4">
            <div className="mb-4">
              <span className="badge px-3 py-2 rounded-pill text-uppercase mb-2" style={{ backgroundColor: colors.accentLight, color: colors.primaryGreen }}>
                My Account
              </span>
              <h2 className="display-6 fw-bold mb-2" style={{ color: colors.textDark }}>
                Welcome Back, !
              </h2>
              <p className="small mb-4" style={{ color: colors.textMuted }}>
                Manage your active furniture subscriptions, rental agreements, and update your personal details.
              </p>
            </div>

            {/* Quick Navigation Tabs */}
            <div className="list-group shadow-sm rounded-4 overflow-hidden border-0 mb-4">
              <button
                onClick={() => setActiveTab('profile')}
                className={`list-group-item list-group-item-action border-0 py-3 px-4 fw-semibold ${activeTab === 'profile' ? 'text-white' : ''}`}
                style={{
                  backgroundColor: activeTab === 'profile' ? colors.primaryGreen : '#FFFFFF',
                  color: activeTab === 'profile' ? '#FFFFFF' : colors.textDark
                }}
              >
                👤 Personal Information
              </button>
              <button
                onClick={() => setActiveTab('rentals')}
                className={`list-group-item list-group-item-action border-0 py-3 px-4 fw-semibold ${activeTab === 'rentals' ? 'text-white' : ''}`}
                style={{
                  backgroundColor: activeTab === 'rentals' ? colors.primaryGreen : '#FFFFFF',
                  color: activeTab === 'rentals' ? '#FFFFFF' : colors.textDark
                }}
              >
                🛋️ Active Furniture Rentals ({activeRentals.length})
              </button>
            </div>
          </div>

          {/* Right Column: Floating Profile / Rentals Card */}
          <div className="col-12 col-lg-8">
            <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white" style={{ borderColor: colors.borderLight }}>

              {activeTab === 'profile' ? (
                <>
                  {/* Profile Header */}
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center pb-4 mb-4 border-bottom">
                    <div className="d-flex align-items-center gap-3 mb-3 mb-sm-0">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4 text-white shadow-sm"
                        style={{ width: '64px', height: '64px', backgroundColor: colors.primaryGreen }}
                      >

                      </div>
                      <div>
                        <h4 className="fw-bold mb-0" style={{ color: colors.textDark }}></h4>
                        <small style={{ color: colors.textMuted }}>Member since </small>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="btn btn-sm px-4 py-2 rounded-3 fw-semibold shadow-sm"
                      style={{
                        backgroundColor: isEditing ? colors.primaryGreen : 'transparent',
                        color: isEditing ? '#FFFFFF' : colors.primaryGreen,
                        border: `1.5px solid ${colors.primaryGreen}`
                      }}
                    >
                      Edit Details
                      {/* {isEditing ? 'Save Changes' : 'Edit Details'} */}
                    </button>
                  </div>

                  {/* Profile Fields */}
                  <div className="row g-4 mb-4">
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-muted text-uppercase">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        disabled={!isEditing}
                        value={userData?.name || ""}
                        onChange={handleInputChange}
                        className="form-control py-2.5 rounded-3"
                        style={{ backgroundColor: isEditing ? '#FFFFFF' : colors.bgLight, borderColor: colors.borderLight }}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-muted text-uppercase">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        disabled={!isEditing}
                        readOnly
                        onChange={handleInputChange}
                        value={userData?.email || ""}
                        className="form-control py-2.5 rounded-3"
                        style={{ backgroundColor: isEditing ? '#FFFFFF' : colors.bgLight, borderColor: colors.borderLight }}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-bold text-muted text-uppercase">Address</label>
                      <textarea
                        type="text"
                        name="address"
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        value={userData?.address || ""}
                        className="form-control py-2.5 rounded-3"
                        style={{ backgroundColor: isEditing ? '#FFFFFF' : colors.bgLight, borderColor: colors.borderLight }}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="text-end">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="btn text-white px-4 py-2.5 rounded-3 fw-semibold shadow-sm"
                        style={{ backgroundColor: colors.primaryGreen }}
                      >
                        Update Profile
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* Active Rentals Tab */
                <div>
                  <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom">
                    <h5 className="fw-bold mb-0" style={{ color: colors.textDark }}>Active Subscriptions</h5>
                    <button className="btn btn-sm btn-outline-secondary rounded-pill px-3">Browse Catalog</button>
                  </div>

                  <div className="d-flex flex-column gap-3">
                    {activeRentals.map(rental => (
                      <div
                        key={rental.id}
                        className="p-3.5 p-md-4 rounded-3 border d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3"
                        style={{ backgroundColor: colors.bgLight, borderColor: colors.borderLight }}
                      >
                        <div>
                          <span className="badge bg-white text-dark border px-2.5 py-1 mb-2 rounded-2 small fw-semibold">
                            {rental.id}
                          </span>
                          <h6 className="fw-bold mb-1" style={{ color: colors.textDark }}>{rental.title}</h6>
                          <div className="small text-muted">
                            Tenure: <span className="fw-medium text-dark">{rental.tenure}</span> &bull; Next auto-pay: <span className="fw-medium text-dark">{rental.nextBilling}</span>
                          </div>
                        </div>

                        <div className="text-sm-end">
                          <div className="fw-bold fs-5 mb-2" style={{ color: colors.primaryGreen }}>{rental.monthlyRent}</div>
                          <button className="btn btn-sm btn-outline-dark rounded-pill px-3">
                            Manage Order
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* Feature Strip */}
      <div className="py-4 border-top" style={{ backgroundColor: '#F5F2EC', borderColor: colors.borderLight }}>
        <div className="container">
          <div className="row g-4 text-start">
            <div className="col-12 col-md-4 d-flex align-items-center gap-3">
              <div className="p-3 rounded-3 d-flex align-items-center justify-center fs-4" style={{ backgroundColor: colors.accentLight }}>
                🛡️
              </div>
              <div>
                <h6 className="fw-bold mb-1" style={{ color: colors.textDark }}>Secure &amp; Safe</h6>
                <small style={{ color: colors.textMuted }}>Your data is protected with top-notch security.</small>
              </div>
            </div>

            <div className="col-12 col-md-4 d-flex align-items-center gap-3">
              <div className="p-3 rounded-3 d-flex align-items-center justify-center fs-4" style={{ backgroundColor: colors.accentLight }}>
                🚚
              </div>
              <div>
                <h6 className="fw-bold mb-1" style={{ color: colors.textDark }}>Hassle-Free Rentals</h6>
                <small style={{ color: colors.textMuted }}>Quick and easy furniture rentals at your fingertips.</small>
              </div>
            </div>

            <div className="col-12 col-md-4 d-flex align-items-center gap-3">
              <div className="p-3 rounded-3 d-flex align-items-center justify-center fs-4" style={{ backgroundColor: colors.accentLight }}>
                🎧
              </div>
              <div>
                <h6 className="fw-bold mb-1" style={{ color: colors.textDark }}>24/7 Support</h6>
                <small style={{ color: colors.textMuted }}>We're here to help you anytime.</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}