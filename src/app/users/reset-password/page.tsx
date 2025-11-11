"use client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
export default function ForgetPassword() {
    const [form, setForm] = useState({
        email: "",
        otp: "",
        newPassword: "",
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrorMessage("");
        setSuccessMessage("");
    };
    const handleGetOTP = () => {
        if (!form.email) {
            setErrorMessage("Email can't be empty");
            return;
        }
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/get-reset-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: form.email}),
        }).then(async (res) => {
            if (res.ok) {
                setStep(2);
                setSuccessMessage("OTP sent to your email.");
                setErrorMessage("");
            } 
            else {
                const data = await res.json();
                setErrorMessage(data.errorMessage || "Something went wrong");
                setSuccessMessage("");
            }
        }).catch(() => setErrorMessage("Network error. Please try again."));
    };
    const handleResetPassword = () => {
        if (!form.otp) {
            setErrorMessage("OTP can't be empty");
            setSuccessMessage("");
            return;
        }
        if (!form.newPassword) {
            setErrorMessage("Password can't be empty");
            setSuccessMessage("");
            return;
        }
        if (form.newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            setSuccessMessage("");
            return;
        }
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/reset-password`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: form.email,
                otp: form.otp,
                password: form.newPassword,
            }),
        }).then(async (res) => {
            if(res.ok) {
                setSuccessMessage("Password reset successful. Redirecting...");
                setErrorMessage("");
                setTimeout(() => router.push("/users/login"), 1500);
            } 
            else {
                const data = await res.json();       
                setErrorMessage(data.errorMessage || "Something went wrong");
                setErrorMessage("");
            }
        }).catch(() => setErrorMessage("Network error. Please try again."));
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 text-white">
            <div className="w-full max-w-lg p-8 rounded-2xl shadow-lg border border-gray-700">
                <h2 className="text-3xl font-bold b-6 text-center">
                    Forget Password
                </h2>
                {errorMessage && (
                    <div className="bg-red-900 text-white text-center text-lg font-bold mb-4 rounded-lg py-2">
                        {errorMessage}
                    </div>
                )}
                {successMessage && (
                    <div className="bg-green-900 text-white text-center text-lg font-bold mb-4 rounded-lg py-2">
                        {successMessage}
                    </div>
                )}
                {step === 1 && (
                <>
                    <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@example.com"
                        className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    </div>
                    <button onClick={handleGetOTP} className="w-full bg-yellow-700 hover:cursor-pointer text-white py-2 rounded-lg hover:bg-yellow-600 transition-all duration-200">
                        Get OTP
                    </button>
                </>
                )}
                {step === 2 && (
                <>
                    <div className="mb-4">
                    <label className="block mb-1">OTP</label>
                    <input
                        type="text"
                        name="otp"
                        value={form.otp}
                        onChange={handleChange}
                        placeholder="Enter OTP"
                        className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block mb-1">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-300 mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    </div>
                    <button onClick={handleResetPassword} className="w-full bg-yellow-700 hover:cursor-pointer text-white py-2 rounded-lg hover:bg-yellow-600 transition-all duration-200">
                        Reset Password
                    </button>
                </>
                )}
            </div>
        </div>
    );
}