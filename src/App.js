import React from 'react';
import FadeIn from 'react-fade-in';

import {Cards, Chart, CountryPicker} from './components';
import styles from './App.module.css';
import {fetchData} from './api';

class App extends React.Component {
    state = {
        data: {},
        country: "",
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);

        this.setState({data: fetchedData, country: country});
    };

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({data: fetchedData});
    }
    render () {
        const { data, country } = this.state; 
        return (
            <>
            <div className={styles.title}>
                <h1>COVID-19 Tracker</h1>
            </div>
            <div className={styles.container}>
                <FadeIn transitionDuration={500}>
                    <Cards data={data} />
                </FadeIn>
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
            </div>
            </>
        )
    }
};


export default App;