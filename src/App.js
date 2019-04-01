/**
 * This is a webpage to calculate loan EMI calculation 
 * User Enter Loan Amount and Loan Duration in months
 * After pressing submit button user will get the interest rate and monthly amount to be paid  on right side
 */

import React, { Component } from 'react';
import './App.css';
import { InputSlider } from './component/slider';
import axios from 'axios';
import logo from './images/loanimage.jpg';

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      loanAmount: 500,
      loanDuration: 6,
      monthlyPayment: 0,
      interestRate: 0,
      flag: 0
    }
  }
  handleLoanAmount = (amount) => {
    this.setState({
      loanAmount: amount
    })
  }
  handleLoanDuration = (duration) => {
    this.setState({
      loanDuration: duration
    })
  }

  /**
   * function to hit the api to get interest rate and amount to be paid 
   */
  calculateLoan = () => {

    const { loanAmount, loanDuration } = this.state;
    axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${loanAmount}&numMonths=${loanDuration}`)
      .then((res) => {
        this.setState({
          monthlyPayment: res.data.monthlyPayment.amount,
          interestRate: res.data.interestRate,
          flag: 1
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    let { loanAmount, loanDuration } = this.state
    return (
      <div>
        <div style={{ backgroundColor: 'purple' }}>
          <img src={logo} style={{ height: '15%', width: '7%', position: 'absolute', left: '20%', borderBottom: '12px solid purple' }} />;
          <p style={{ textAlign: 'center', fontSize: '60px', marginTop: 0, color: 'white' }}>Loan EMI Calculator</p>
        </div>
        <div style={{ position: 'absolute', top: '25%', left: '20%', width: '50%', height: '50%', backgroundColor: 'lightBlue', borderRadius: 5, padding: '2%' }}>
          <label style={{ fontWeight: 'bold' }}>Loan Amount: </label>

          <input type="text" value={loanAmount} style={{ borderRadius: 5, width: '35%', textAlign: 'center' }} />
          <span >$</span>
          <div style={{ width: '70%', paddingLeft: '10%' }}>
            <InputSlider min={500} max={5000} value={loanAmount} orientation="vertical"
              onChange={this.handleLoanAmount} labels={{ 500: '500', 2500: '2500', 5000: '5000' }}
            />
          </div>
          <div style={{ marginTop: '20%' }}>
            <label style={{ fontWeight: 'bold' }}>Loan Duration: </label>
            <input type="number" value={loanDuration} style={{ borderRadius: 5, width: '35%', textAlign: 'center' }} />
            <span >months</span>
            <div style={{ width: '70%', paddingLeft: '10%' }}>
              <InputSlider min={6} max={24} value={loanDuration} orientation="vertical"
                onChange={this.handleLoanDuration} labels={{ 6: '6', 15: '15', 24: '24' }} />
            </div>
          </div>
          <input type="button" value="submit" className='submitButton' onClick={this.calculateLoan} />
        </div>

        {
          this.state.flag > 0 ?
            <div style={{ position: 'absolute', left: '80%', top: '25%', backgroundColor: 'lightBlue', padding: '2%', paddingTop: '1%', borderRadius: 5 }}>
              <p style={{ textAlign: 'center'.anchor, fontWeight: 'bold', fontSize: '30px' }}>EMI Result</p>
              <p className="resultData">Loan Amount : </p>
              <span>{this.state.loanAmount}$</span>
              <p className="resultData">Loan Duration :</p>
              <span>{this.state.loanDuration} months</span>
              <p className="resultData">Monthly Payment :</p>
              <span>{this.state.monthlyPayment}$</span>
              <p className="resultData">Interest Rate : </p>
              <span >{this.state.interestRate}%</span>
            </div>
            : null
        }
        <div>

        </div>
      </div>
    );
  }
}

export default App;


