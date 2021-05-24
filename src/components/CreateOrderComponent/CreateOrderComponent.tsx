import React, {useEffect, useState} from 'react';
import styles from './CreateOrderComponent.module.scss';
import {geoData} from "../../services/geoDataService";
import { ApiServices } from '../../services/api.service';

const CreateOrderComponent = () => {
    const apiServices = new ApiServices();

    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [sellerStore, setSellerStore] = useState('');
    const [shippingOption, setShippingOption] = useState('');
    const [externalOrderNumber, setExternalOrderNumber] = useState('');
    const [buyerName, setBuyerName] = useState('');
    const [buyerLastName, setBuyerLastname] = useState('');
    const [buyerPhone, setBuyerPhone] = useState('');
    const [buyerEmail, setBuyerEmail] = useState('');
    const [buyerAddress, setBuyerAddress] = useState('');

    const [shippingOptions, setShippingOptions] = useState<any[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [regions, setRegions] = useState<any[]>([]);
    const [countryId, setCountryId] = useState(-1);
    const [productList, setProductList] = useState<any[]>([]);

    const [productName, setProductName] = useState('');
    const [productQTY, setProductQTY] = useState('');
    const [productWeight, setProductWeight] = useState('');
    useEffect(() => {
        // console.log(countryId, cities, city)
        // console.log(country, city)
        loadShippingMethods();
    });
    /* todo: existe una forma de utilizar event en el bind de a fn para no convertir estos 3 metodos de seleccion en un
    solo handler? */
    const selectCountry = (event: any) => {
        if (event && event.target.value) {
            const selection = Number(event.target.value);
            if (selection !== -1) {
                setCountryId(selection);
                setRegions(geoData[selection].regions);
                setCountry(geoData[selection].country);
            } else {
                setCountryId(-1);
                setRegions([]);
                setCities([]);
            }
        }
    }
    const selectRegion = (event: any) => {
        if (event && event.target.value) {
            const selection = Number(event.target.value);
            if (selection !== -1) {
                setRegion(geoData[countryId].regions[selection].name);
                setCities(geoData[countryId].regions[selection].cities);
            } else {
                setRegion('');
                setRegions([]);
                setCities([]);
            }
        }
    }
    const selectCity = (event: any) => {
        if (event && event.target.value) {
            setCity(event.target.value)
        }
    }
    const loadShippingMethods = async () => {
        const shipingOptionsData = await apiServices.getShippingMethods();
        if (shipingOptionsData) {
            setShippingOptions(shipingOptionsData);
        }
    }
    // -- seters
    const setSellerStoreFn = (e: any) => {
        const value = e.target.value;
        setSellerStore(value);
    }
    const setShippingMethodFn = (e: any) => {
        const value = e.target.value;
        const found = shippingOptions.find((shpMethod) => shpMethod.id === Number(value));
        setShippingOption(found);
    }
    const setExternalOrderNumberFn = (e: any) => {
        const value = e.target.value;
        setExternalOrderNumber(value);
    }
    const setBuyerNameFn = (e: any) => {
        const value = e.target.value;
        setBuyerName(value);
    }
    const setBuyerLastNameFn = (e: any) => {
        const value = e.target.value;
        setBuyerLastname(value);
    }
    const setBuyerPhoneFn = (e: any) => {
        const value = e.target.value;
        setBuyerPhone(value);
    }
    const setBuyerEmailFn = (e: any) => {
        const value = e.target.value;
        setBuyerEmail(value);
    }
    const setBuyerAddressFn = (e: any) => {
        const value = e.target.value;
        setBuyerAddress(value);
    }
    //--
    const setBuyerProductNameFn = (e: any) => {
        const value = e.target.value;
        setProductName(value);
    }
    const setBuyerProductQTYFn = (e: any) => {
        const value = e.target.value;
        setProductQTY(value);
    }
    const setBuyerProductWightFn = (e: any) => {
        const value = e.target.value;
        setProductWeight(value);
    }

    const addProductToList = () => {
        const product = {
          name: productName,
          qty: productQTY,
          weight: productWeight
        };
        setProductList([...[product], ...productList]);
    }

    const createOrder = async () => {
        const order = {
            sellerStore: sellerStore,
            shippingMethod: shippingOption,
            externalOrderNumber: externalOrderNumber,
            /*buyer*/
            name: `${buyerName} ${buyerLastName}`,
            phone: buyerPhone,
            email: buyerEmail,
            shippingAddress: buyerAddress,
            shippingCity: city,
            shippingRegion: region,
            shippingCountry: country,
            items: productList
            /*-*/
        }
        const result = await apiServices.createOrder(order);
        console.log(result)
    }
    return (
        <div className={styles.CreateOrderComponent} data-testid="CreateOrderComponent">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className={styles.formSection}>
                    <label className={styles.sectionTitle}>Seller Info</label>
                    <div className="mb-3">
                        <label htmlFor="sellerStore" className={[styles.labelOrderLeft, 'form-label'].join(' ')}>
                            Seller Store
                        </label>
                        <input type="text" placeholder="please write the name of the seller"
                               className="form-control" id="sellerStore" aria-describedby="sellerStoreHelp"
                               onChange={setSellerStoreFn}/>
                        <div id="sellerStoreHelp" className={[styles.labelOrderLeft, 'form-text'].join(' ')}>
                            error message
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="shippingMethod" className={[styles.labelOrderLeft, 'form-label'].join(' ')}>
                            Select a Shipping Method
                        </label>
                        <select className="form-select" aria-label="Please select a shipping method"
                                onChange={setShippingMethodFn}>
                            <option selected>Open this select menu</option>
                            {shippingOptions.map(item => {
                                return <option value={item.id}>{item.name}</option>;
                            })}
                        </select>
                        <div id="shippingMethodHelp" className={[styles.labelOrderLeft, 'form-text'].join(' ')}>
                            error message
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="externalOrderNumber" className={[styles.labelOrderLeft, 'form-label'].join(' ')}>
                            External order number
                        </label>
                        <input type="text" className="form-control" id="externalOrderNumber"
                               aria-describedby="externalOrderNumberHelp"
                               placeholder="please write an external order number" onChange={setExternalOrderNumberFn}/>
                        <div id="externalOrderNumberHelp" className={[styles.labelOrderLeft, 'form-text'].join(' ')}>
                            error message
                        </div>
                    </div>
                </div>

                <div className={styles.formSectionSecondary}>
                    <label className={styles.sectionTitle}>Buyer Info</label>

                    <div className="mb-3">
                        <label className={[styles.labelOrderLeft, 'form-label'].join(' ')}>
                            Buyer Name
                        </label>
                        <div className="row g-3">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="First name"
                                       aria-label="First name" onChange={setBuyerNameFn}/>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Last name"
                                       aria-label="Last name" onChange={setBuyerLastNameFn}/>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className={[styles.labelOrderLeft, 'form-label'].join(' ')}>
                            Buyer Contact
                        </label>
                        <div className="row g-3">
                            <div className="col">
                                <input type="number" className="form-control" placeholder="Buyer Phone"
                                       aria-label="Buyer Phone" onChange={setBuyerPhoneFn}/>
                            </div>
                            <div className="col">
                                <input type="email" required className="form-control" placeholder="Buyer Email"
                                       aria-label="Buyer Email" onChange={setBuyerEmailFn}/>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className={[styles.labelOrderLeft, 'form-label'].join(' ')}>
                            Buyer Location
                        </label>
                        <div className="row g-3">
                            <div className="col">
                                <select className="form-select"
                                        onChange={selectCountry}>
                                    <option selected value={-1}>Open this select menu</option>
                                    {geoData.map(item => {
                                        return <option value={item.id}>{item.country}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="col">
                                <select className="form-select"
                                        onChange={selectRegion}>
                                    <option selected value={-1}>Open this select menu</option>
                                    {regions.map(item => {
                                        return <option value={item.id}>{item.name}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="col">
                                <select className="form-select"
                                onChange={selectCity}>
                                    <option selected>Open this select menu</option>
                                    {cities.map(item => {
                                        return <option>{item}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="buyerAddress" className={[styles.labelOrderLeft, 'form-label'].join(' ')}>
                            Buyer Address
                        </label>
                        <input type="text" className="form-control" id="buyerAddress"
                               aria-describedby="buyerAddressHelp"
                               placeholder="please write an address for shipping" onChange={setBuyerAddressFn}/>
                    </div>
                </div>

                <div className={styles.formSectionAlternative}>

                    <div className="mb-3">
                        <label className={styles.sectionTitle}>
                            Buyer Products
                        </label>
                        <div className="row g-3">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Product name"
                                       onChange={setBuyerProductNameFn}/>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Product QTY"
                                       onChange={setBuyerProductQTYFn}/>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Product weight"
                                       onChange={setBuyerProductWightFn}/>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-primary"
                                        onClick={addProductToList}>Add item</button>
                            </div>
                        </div>
                        <div className="row g-3">
                            {productList && productList.length > 0 ? <label>
                                Selected Products
                            </label> : ''}
                            <div className={styles.itemBox}>
                                {productList.map((item, i) => {
                                    // todo: add a remove item button?
                                    const view = <div className={styles.productList}>
                                        <strong>#{i+1}</strong><span>{item.name}</span><span>{item.qty}</span>
                                        <span>{item.weight}</span></div>;
                                    return view;
                                })}
                            </div>
                        </div>
                    </div>

                </div>

                <div className={styles.submitBtnSpacing}>
                    <button type="submit" className="btn btn-primary" onClick={createOrder}>Create order</button>
                </div>
            </form>
        </div>
    );
}

export default CreateOrderComponent;
