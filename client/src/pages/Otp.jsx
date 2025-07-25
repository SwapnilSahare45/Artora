import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Otp = () => {
    // State to hold user input value
    const [data, setData] = useState({ email: '', code: '' });

    // Get verifyUser function, user state,Loading state, and error from auth store
    const { user, verifyUser, isLoading, error } = useAuthStore();

    const navigate = useNavigate();

    // When componet mount or user value change check email is present
    // if not navigate to register else set the email in data state
    useEffect(() => {
        if (!user?.email) {
            navigate("/register");
        } else {
            setData((prev) => ({ ...prev, email: user.email }));
        }
    }, [user])

    // Function to handle verify user
    const handleVerify = async () => {
        if (!data.code) {
            toast.error("Please enter OTP.");
            return;
        }

        const success = await verifyUser(data);

        // Check user verify successfully
        // if yes then navigate to login else show an error
        if (success) {
            toast.success('Registeration successful.');
            navigate("/login");
        } else {
            toast.error(error || "Something went wrong!");
        }
    }

    return (
        <main className="grid grid-cols-1 md:grid-cols-2 h-auto bg-white md:h-screen">
            {/* Left Panel */}
            <div className="flex flex-col justify-center items-center gap-4 py-8 px-2 md:p-8">
                <div className="flex flex-col items-center gap-1">
                    <img src={logo} alt="ARTORA" className="w-28" />
                    <h1 className="text-4xl tracking-widest text-primary">ARTORA</h1>
                </div>
            </div>

            {/* Right Panel */}
            <div className="bg-primary/90 flex flex-col justify-center items-center py-8 px-6">
                <h1 className='text-3xl text-white'>Verify OTP</h1>

                <div className="w-full max-w-md flex flex-col gap-4 mt-6">
                    <input
                        type="Number"
                        placeholder="Enter OTP"
                        className="bg-gray-100 text-gray-900 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-white"
                        value={data.code}
                        onChange={(e) => setData({ ...data, code: e.target.value.slice(0, 6) })}
                    />

                    <button
                        className='bg-white text-primary text-lg rounded py-1 tracking-wider cursor-pointer'
                        disabled={isLoading}
                        onClick={handleVerify}
                    >
                        {isLoading ? "Verifying..." : "Verify OTP"}
                    </button>
                </div>

            </div>

        </main>
    )
}

export default Otp