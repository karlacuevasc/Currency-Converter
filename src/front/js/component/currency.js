import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import DropdownItem from "@restart/ui/esm/DropdownItem";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";

export const CurrencyConversion = () => {
	// const [uSDJPY, setUSDJPY] = useState("");
	const [conversion, setConversion] = useState([]);
	const [first, setFirst] = useState("USD");
	const [second, setSecond] = useState("JPY");
	const [number, setNumber] = useState(0);
	const [currencyID, setCurrencyID] = useState([]);
	const [result, setResult] = useState(0);

	// useEffect(() => {
	// 	axios({
	// 		method: "GET",
	// 		url: "https://free.currconv.com/api/v7/convert?q=USD_JPY&compact=ultra&apiKey=2cb6b072928e68b1f2ac"
	// 	})
	// 		.then(response => {
	// 			console.log(response.data);
	// 			setUSDJPY(response.data.USD_JPY);
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		});
	// }, []);

	// let currencyID = [];

	useEffect(() => {
		axios({
			method: "GET",
			url: "https://free.currconv.com/api/v7/currencies?apiKey=2cb6b072928e68b1f2ac"
		})
			.then(response => {
				console.log(response.data.results);

				let getIndividualIDs = response.data.results;

				for (let i in getIndividualIDs) {
					if (typeof getIndividualIDs[i] === "object") {
						setCurrencyID(oldArray => [...oldArray, getIndividualIDs[i]]);
					}
				}
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	const getConversion = (first, second) => {
		axios({
			method: "GET",
			url: `https://free.currconv.com/api/v7/convert?q=${first}_${second}&compact=ultra&apiKey=2cb6b072928e68b1f2ac`
		})
			.then(response => {
				console.log(response.data);

				setConversion(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const firstHandleSelect = e => {
		console.log(e);
		setFirst(e);
	};

	const secondHandleSelect = e => {
		console.log(e);
		setSecond(e);
	};

	// console.log(convert());

	return (
		// <Row>
		// 	<Col></Col>

		// 	<Col>
		<div className="text-center mt-5">
			<Container className="content m-auto">
				<Container>
					<h1> Currency Converter</h1>
				</Container>
				<br />
				<br />

				<Container>
					{/* <input type="text" value={first} onChange={e => setFirst(e.target.value)} />
					<input type="text" value={second} onChange={e => setSecond(e.target.value)} /> */}

					<Container className="buttons">
						<Row>
							<Col />
							<Col />
							<Col>
								<h5 className="field">Amount</h5>
								<input type="text" value={number} onChange={e => setNumber(parseInt(e.target.value))} />
							</Col>
							<Col>
								<h5>From</h5>
								<DropdownButton
									className="boton1"
									variant="warning"
									id="dropdown-item-button"
									title={first}
									value={first}
									onSelect={firstHandleSelect}>
									{currencyID.map(item => {
										return (
											<Dropdown.Item as="button" key={item.id} eventKey={item.id}>
												{item.id} - {item.currencyName}
											</Dropdown.Item>
										);
									})}
								</DropdownButton>
							</Col>
							<Col className="m-auto">
								<Button variant="success">
									<i className="fas fa-exchange-alt" />
								</Button>
							</Col>
							<Col>
								<h5>To</h5>
								<DropdownButton
									className="boton2"
									variant="warning"
									id="dropdown-item-button"
									title={second}
									value={second}
									onSelect={secondHandleSelect}>
									{currencyID.map(item => {
										return (
											<Dropdown.Item as="button" key={item.id} eventKey={item.id}>
												{item.id} - {item.currencyName}
											</Dropdown.Item>
										);
									})}
								</DropdownButton>
							</Col>
							<Col />
							<Col />
						</Row>
					</Container>
				</Container>
				<Container className="convert">
					<h1>
						{number} {first} = {number * conversion[`${first}_${second}`]} {second}{" "}
					</h1>
				</Container>

				<Button
					className="convert"
					variant="success"
					onClick={() => {
						getConversion(first, second);
					}}>
					Convert button
				</Button>
			</Container>
		</div>
		// 	</Col>
		// 	<Col></Col>
		// </Row>
	);
};
