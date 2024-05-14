import React, { useState, useEffect } from 'react';
import GeneratorForm from '../components/forms/GeneratorForm';
import '../styles/form.css';
import GeneratorHeader from '../components/headers/GeneratorHeader';
import axios from 'axios';

function GeneratorPage() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [series, setSeries] = useState("");
    const [number, setNumber] = useState("");
    const [dateOfIssue, setDateOfIssue] = useState("");
    const [citizenship, setCitizenship] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [issuedBy, setIssuedBy] = useState("");
    const [departmentCode, setDepartmentCode] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const isAuthorized = localStorage.getItem("isAuthorized");
        if (isAuthorized === process.env.REACT_APP_IS_AUTH) {
            setIsAuthorized(true);

            const fetchAuthor = async () => {
                try {
                    const authorId = localStorage.getItem("authorId");
                    const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/author/get_author?authorId=" + authorId,
                        {
                            auth: {
                                username: process.env.REACT_APP_USERNAME,
                                password: process.env.REACT_APP_PASSWORD
                            }
                        }
                    );
                    const authorData = response.data;
                    setName(authorData.name);
                    setAddress(authorData.address);
                    setSeries(authorData.series);
                    setNumber(authorData.number);
                    setDateOfIssue(authorData.dateOfIssue);
                    setCitizenship(authorData.citizenship);
                    setDateOfBirth(authorData.dateOfBirth);
                    setIssuedBy(authorData.issuedBy);
                    setDepartmentCode(authorData.departmentCode);

                    const words = authorData.name.split(" ");
                    if (words.length === 3) {
                        const [surname, firstName, lastName] = words;
                        const currentUsername = `${surname} ${firstName.charAt(0)}.${lastName.charAt(0)}.`
                        setUsername(currentUsername);
                        localStorage.setItem("username", currentUsername);
                    } else {
                        setUsername(authorData.name);
                        localStorage.setItem("username", authorData.name);
                    }
                } catch (err) {
                    alert("Ошибка при получении данных профиля.");
                    handleLogout();
                } finally {
                    setIsLoading(false);
                }
            };

            fetchAuthor();
        } else {
            setIsLoading(false);
        }

    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsAuthorized(false);
        setName("");
        setAddress("");
        setSeries("");
        setNumber("");
        setDateOfIssue("");
        setCitizenship("");
        setDateOfBirth("");
        setIssuedBy("");
        setDepartmentCode("");
        window.location.reload();
    };

    return (
        <div>
            {!isLoading && (
                <div>
                    <GeneratorHeader
                        isAuthorized={isAuthorized}
                        name={username}
                        handleLogout={handleLogout}
                    />
                    <GeneratorForm
                        name={name}
                        address={address}
                        series={series}
                        number={number}
                        dateOfIssue={dateOfIssue}
                        citizenship={citizenship}
                        dateOfBirth={dateOfBirth}
                        issuedBy={issuedBy}
                        departmentCode={departmentCode}
                    />
                </div>
            )}
        </div>

    );
}

export default GeneratorPage;