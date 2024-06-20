import { useEffect, useState } from "react";
import styles from './Profile.module.css';

function Profile() {
    const [profile, setProfile] = useState({});
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        // Simulando o carregamento dos dados do perfil
        setTimeout(() => {
            const dummyProfile = {
                email: "example@example.com" // Simulação de dados do perfil
            };
            setProfile(dummyProfile);
        }, 1000); // Tempo fictício de carregamento
    }, []);

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (newPassword === confirmPassword) {
            // Simulando a alteração de senha
            setTimeout(() => {
                alert("Password updated successfully");
            }, 1000); // Simulação de tempo de resposta da API
        } else {
            alert("Passwords do not match");
        }
    };

    const handleDeleteAccount = () => {
        // Simulando a exclusão da conta
        setTimeout(() => {
            alert("Account deleted successfully");
            // Redirecionar ou lidar com a lógica pós-exclusão
        }, 1000); // Simulação de tempo de resposta da API
    };

    return (
        <div className={styles.container}>
            <div className={styles.profileDetails}>
                <h2>Profile Information</h2>
                <p><strong>Email:</strong> {profile.email}</p>
            </div>
            <div className={styles.passwordChange}>
                <h2>Change Password</h2>
                <form onSubmit={handlePasswordChange} className={styles.form}>
                    <label className={styles.label} htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <label className={styles.label} htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <input type="submit" value="Change Password" className={styles.submit} />
                </form>
            </div>
            <div className={styles.deleteAccount}>
                <h2>Delete Account</h2>
                <button onClick={handleDeleteAccount} className={styles.deleteButton}>Delete Account</button>
            </div>
        </div>
    );
}

export default Profile;
