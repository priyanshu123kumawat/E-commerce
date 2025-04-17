import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const Adduser = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
// console.log(gender);



    const navigate = useNavigate();



    const handleFormSumbit = async (event) => {
        event.preventDefault();

        const rawResponse = await fetch(
            "http://localhost:2000/api/user/registration",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },


                body: JSON.stringify({ name, email, mobile, address, password, gender, country, state, city }),
            }
        );
        console.log(rawResponse);



        // console.log(rawResponse);

        const content = await rawResponse.json();

        if (content.success) {

            toast.success(content.message);


            navigate("/")
        } else {
            toast.error(content.message);
        }
    };





    return (
        <div>

            <body bgcolor="Lightskyblue">
                <br />
                <br />
                <form onSubmit={handleFormSumbit} style={{ marginLeft: '40%' }}>

                    <label> Name </label>
                    <br />
                    <input
                        type="name"
                        onChange={(e) => setName(e.target.value)}
                        required
                        value={name}
                    /> <br /> <br />

                    <label >
                        Email:
                    </label>
                    <br />
                    <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} /> <br />
                    <br /> <br />

                    <label >
                        Password:
                    </label>
                    <br />
                    <input type="Password" id="Password" name="Password" onChange={(e) => setPassword(e.target.value)} /> <br />
                    <br /> <br />


                    <label>
                        Country :
                    </label>
                    <br />
             

                    <input
                        type="country"
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        value={country}
                    />

                    <br />
                    <br />

                    <label>
                        City :
                    </label>
                    <br />
             
                    <input
                        type="City"
                        onChange={(e) => setCity(e.target.value)}
                        required
                        value={city}
                    />

                    <br />
                    <br />

                    <label>
                        STATE
                    </label>
              
                    <br />
                    <input
                        type="STATE"
                        onChange={(e) => setState(e.target.value)}
                        required
                        value={state}
                    />
                    <br />
                    <br />


                    <label>
                        Gender :
                    </label><br />
                    <input type="radio" value="male" required  onChange={(e) => setGender(e.target.value)} /> Male <br />
                    <input type="radio" value="female" required   onChange={(e) => setGender(e.target.value)} /> Female <br />

                    <br />
                    <br />

                    <label>
                        Mobile :
                    </label>
                    <br />
                    {/* <input type="text" name="country code" value="+91" size="2" /> */}
                    <input
                        type="mobile"
                        onChange={(e) => setMobile(e.target.value)}
                        required
                        value={mobile}
                    /> <br /> <br />



                    <label >
                        Address
                    </label>
                    <br />
                    <input
                        type="address"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        value={address}
                    />

                    <br /> <br />

             
                    <button name="submit" type="submit" data-submit="...Sending" style={{backgroundColor:"green",color:"white"}}>Submit</button>
                    <button name="cancel" type="cancel" data-submit="...Sending" style={{marginLeft:"10%"}}>Cancel</button>.


                </form>
            </body>
        </div>
    )
}

export default Adduser