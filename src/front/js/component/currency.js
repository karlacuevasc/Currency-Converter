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
	const [searchValue, setSearchValue] = useState("");

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

	return (
		// <Row>
		// 	<Col></Col>

		// 	<Col>
		<div className="text-center mt-5">
			<Container className="content m-auto">
				<Container className="title">
					<h1> Currency Converter</h1>
				</Container>
				<br />
				<br />

				<Container className="mb-5">
					<Container className="buttons">
						<Row>
							{/* <Col />
							<Col /> */}
							<Col className="pb-5">
								<h5 className="field">Amount</h5>
								<input
									type="number"
									value={number}
									onChange={e =>
										setNumber(e.target.value) ? setNumber(parseInt(e.target.value)) : 0
									}
								/>
							</Col>
							<Col>
								<h5 className="field mb-4">From</h5>
								<DropdownButton
									className="boton1"
									variant="warning"
									id="dropdown-item-button"
									title={first}
									value={first}
									onSelect={firstHandleSelect}
									onKeyUp={e => setSearchValue(e.target.value)}>
									<input className="input1" />
									{currencyID
										.filter(item => {
											if (searchValue == "") {
												return item;
											} else if (
												item.currencyName.toLowerCase().includes(searchValue.toLowerCase()) &&
												item.id.toLowerCase().includes(searchValue.toLowerCase())
											) {
												return item;
											}
										})
										.map(item => {
											return (
												<Dropdown.Item as="button" key={item.id} eventKey={item.id}>
													{item.id} - {item.currencyName}
												</Dropdown.Item>
											);
										})}
								</DropdownButton>
							</Col>
							<Col className="mt-5">
								<Button
									variant="success"
									onClick={() => (setFirst(second) ? setFirst(second) : setSecond(first))}>
									<i className="fas fa-exchange-alt" />
								</Button>
							</Col>
							<Col>
								<h5 className="field mb-4">To</h5>

								<DropdownButton
									className="boton2"
									variant="warning"
									id="dropdown-item-button"
									title={second}
									value={second}
									onSelect={secondHandleSelect}
									onKeyUp={e => setSearchValue(e.target.value)}>
									<input className="input2" />
									{currencyID
										.filter(item => {
											if (searchValue == "") {
												return item;
											} else if (
												item.currencyName.toLowerCase().includes(searchValue.toLowerCase()) &&
												item.id.toLowerCase().includes(searchValue.toLowerCase())
											) {
												return item;
											}
										})
										.map(item => {
											return (
												<Dropdown.Item as="button" key={item.id} eventKey={item.id}>
													{item.id} - {item.currencyName}
												</Dropdown.Item>
											);
										})}
								</DropdownButton>
							</Col>
							{/* <Col />
							<Col /> */}
						</Row>
					</Container>
				</Container>

				<Container className="convert">
					<h1>
						{number} {first} ={" "}
						{conversion[`${first}_${second}`] ? number * conversion[`${first}_${second}`].toFixed(2) : 0}{" "}
						{second}
					</h1>
				</Container>

				<Button
					className="convert"
					variant="success"
					onClick={() => {
						getConversion(first, second);
					}}>
					Convert
				</Button>
			</Container>
		</div>
		// 	</Col>
		// 	<Col></Col>
		// </Row>
	);
};
