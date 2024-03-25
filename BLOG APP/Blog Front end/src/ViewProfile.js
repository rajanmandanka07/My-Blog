import React, { useEffect, useState } from 'react';

const ViewProfile = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Retrieve the username from session storage
        const storedUsername = sessionStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <>
            <div className="mb-3 row my-3">
                <label htmlFor="staticUsername" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>
                    Username :
                </label>
                <div className="col-sm-10">
                    <input
                        className="form-control"
                        type="text"
                        value={username}
                        aria-label="readonly input example"
                        readOnly
                    />
                </div>
            </div>
        </>
    );
};

export default ViewProfile;
