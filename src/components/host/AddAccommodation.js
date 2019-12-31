/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SideBar from '../side-bar';
import HomeNav from '../home-nav/HomeNav';
import Footer from '../footer';
import '../../styles/add-accommodation.scss';
import {
  createAccommodation,
  getAllLocations,
} from '../../redux/actions/accommodatinsAction';

export class AddAccommodation extends Component {
  state = {
    data: {
      services: [{ service: 'basic' }],
      amenities: [{ amenity: 'basic' }],
      images: []
    }
  };

  componentDidMount() {
    this.props.getAllLocations();
  }

  handleInputChange = ({ target: input }) => {
    const data = { ...this.state.data };
    data[input.id] = input.value;
    this.setState({ data });
  };

  handleCheckbox = ({ target: input }) => {
    this.state.data.services.push({ service: input.value });
  };

  handleImageSelect = ({ target: input }) => {
    const images = Object.values(input.files);
    images.forEach(image => this.state.data.images.push(image));
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      data: {
        images,
        accommodation_name,
        services,
        location,
        description,
        amenities
      }
    } = this.state;
    let form_data = new FormData();
    form_data.append('accommodation_name', accommodation_name);
    form_data.append('description', description);
    form_data.append('location', location);
    form_data.append('services', JSON.stringify(services)); // should be an array of servicies obj
    form_data.append('amenities', JSON.stringify(amenities)); // should be an array of amenities obj
    images.forEach(image => form_data.append('images', image, image.name));
    this.props.createAccommodation(form_data);
  };

  render() {
    const { isLoading, user, locations } = this.props;
    return (
      <>
        <HomeNav />
        <SideBar />
        <section className="section-book">
          <div className="row">
            <div className="book">
              <div className="book__form">
                <form id="acc_form" onSubmit={this.handleSubmit} className="form">
                  <div className="form__group">
                    <input
                      id="accommodation_name"
                      name="accommodation_name"
                      type="text"
                      className="form__input"
                      placeholder="Accommodation name"
                      required
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="accommodation_name" className="form__label">
                      Accommodation name
                    </label>
                  </div>

                  <div className="form__group">
                    <div className="form__select-group">
                      <select
                        id="location"
                        name="location"
                        onChange={this.handleInputChange}
                        className="dropbtn"
                        required
                      >
                        <option value="null">
                          Where is the accommodation?
                        </option>
                        {!locations ? (null) : (locations.map(location => {
                          return <option value={location.id}>{location.name}</option>
                        }))}
                      </select>
                    </div>
                  </div>

                  <div className="form__group">
                    <h6 className="heading-tertiary u-margin-bottom-small">
                      Select all the services you offer
                    </h6>
                    <div className="form__checkbox-group">
                      <input
                        id="service1"
                        name="service"
                        type="checkbox"
                        className="form__checkbox-input"
                        value="testing service"
                        onChange={this.handleCheckbox}
                      />
                      <label
                        htmlFor="service1"
                        className="form__checkbox-label"
                      >
                        <span className="form__checkbox-button"></span>
                        testing seervice
                      </label>
                    </div>

                    <div className="form__checkbox-group">
                      <input
                        id="service2"
                        name="service"
                        type="checkbox"
                        className="form__checkbox-input"
                        value="Catering services"
                        onChange={this.handleCheckbox}
                      />
                      <label
                        htmlFor="service2"
                        className="form__checkbox-label"
                      >
                        <span className="form__checkbox-button"></span>
                        Catering services
                      </label>
                    </div>


                    <div className="form__checkbox-group">
                      <input
                        id="service3"
                        name="service"
                        type="checkbox"
                        className="form__checkbox-input"
                        value="Dry cleaning"
                        onChange={this.handleCheckbox}
                      />
                      <label
                        htmlFor="service3"
                        className="form__checkbox-label"
                      >
                        <span className="form__checkbox-button"></span>
                        Dry cleaning
                      </label>
                    </div>

                    <div className="form__checkbox-group">
                      <input
                        id="service4"
                        name="service"
                        type="checkbox"
                        className="form__checkbox-input"
                        value="Complimentary Wi-Fi"
                        onChange={this.handleCheckbox}
                      />
                      <label
                        htmlFor="service4"
                        className="form__checkbox-label"
                      >
                        <span className="form__checkbox-button"></span>
                        Complimentary Wi-Fi
                      </label>
                    </div>

                    <div className="form__checkbox-group">
                      <input
                        id="service5"
                        name="service"
                        type="checkbox"
                        className="form__checkbox-input"
                        value="Excursions and guided tours"
                        onChange={this.handleCheckbox}
                      />
                      <label
                        htmlFor="service5"
                        className="form__checkbox-label"
                      >
                        <span className="form__checkbox-button"></span>
                        Excursions and guided tours
                      </label>
                    </div>
                    <div className="form__checkbox-group">
                      <input
                        id="service6"
                        name="service"
                        type="checkbox"
                        className="form__checkbox-input"
                        value="Sauna and steam bath"
                        onChange={this.handleCheckbox}
                      />
                      <label
                        htmlFor="service6"
                        className="form__checkbox-label"
                      >
                        <span className="form__checkbox-button"></span>
                        Sauna and steam bath
                      </label>
                    </div>
                    <div className="form__checkbox-group">
                      <input
                        id="service7"
                        name="service"
                        type="checkbox"
                        className="form__checkbox-input"
                        value="Room service (24-hour)"
                        onChange={this.handleCheckbox}
                      />
                      <label
                        htmlFor="service7"
                        className="form__checkbox-label"
                      >
                        <span className="form__checkbox-button"></span>
                        Room service (24-hour)
                      </label>
                    </div>
                    <div className="form__checkbox-group">
                      <input
                        id="service8"
                        name="service"
                        type="checkbox"
                        className="form__checkbox-input"
                        value="Transfer and chauffeur driven limousine services"
                        onChange={this.handleCheckbox}
                      />
                      <label
                        htmlFor="service8"
                        className="form__checkbox-label"
                      >
                        <span className="form__checkbox-button"></span>
                        Transfer and chauffeur driven limousine services
                      </label>
                    </div>
                  </div>

                  <div className="form__group">
                    <textarea
                      id="description"
                      name="description"
                      type="textarea"
                      className="form__textarea"
                      placeholder="description"
                      required
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="desc" className="form__label">
                      Description
                    </label>
                  </div>
                  <div className="form__group">
                    <input
                      id="images"
                      type="file"
                      className="form__input"
                      placeholder="images"
                      name="myImage"
                      accept="image/*"
                      onChange={this.handleImageSelect}
                      multiple
                      required
                    />
                  </div>

                  <div className="form__group">
                    <button id="save" className="acc-btn acc-btn--primary">
                      {isLoading ? ("Saving...") : (<>Save</> )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.profile.user,
  locations: state.accommodations.locations,
  isLoading: state.accommodations.isLoading,
});

const mapDispatchToProps = {
  createAccommodation,
  getAllLocations
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAccommodation);
