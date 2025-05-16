import './App.css'

import {Component} from 'react'

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    isPassShown: false,
    usersList: [],
    searchPassword: '',
  }

  onChangeSearchPasswords = event => {
    this.setState({
      searchPassword: event.target.value,
    })
  }

  onChangeWebsite = event => {
    this.setState({
      website: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newUserListItem = {
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      usersList: [...prevState.usersList, newUserListItem],
      website: '',
      username: '',
      password: '',
    }))
  }

  toggleCheckBox = () => {
    this.setState(prevState => ({
      isPassShown: !prevState.isPassShown,
    }))
  }

  deleteItem = website => {
    this.setState(prevState => ({
      usersList: prevState.usersList.filter(
        eachItem => eachItem.website !== website,
      ),
    }))
  }

  render() {
    const {
      website,
      username,
      password,
      usersList,
      searchPassword,
      isPassShown,
    } = this.state
    const filteredResults = usersList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchPassword.toLowerCase()),
    )
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="top-container">
          <div className="form-container">
            <h1 className="form-heading">Add New Password</h1>
            <form onSubmit={this.onSubmitForm}>
              <div className="input-row">
                <label className="icon-container" htmlFor="website">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-icon"
                  />
                </label>
                <input
                  type="text"
                  className="input-box"
                  placeholder="Enter Website"
                  id="website"
                  onChange={this.onChangeWebsite}
                  value={website}
                />
              </div>

              <div className="input-row">
                <label className="icon-container" htmlFor="username">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-icon"
                  />
                </label>
                <input
                  type="text"
                  className="input-box"
                  placeholder="Enter Username"
                  id="username"
                  onChange={this.onChangeUsername}
                  value={username}
                />
              </div>

              <div className="input-row">
                <label className="icon-container" htmlFor="password">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-icon"
                  />
                </label>
                <input
                  type="password"
                  className="input-box"
                  placeholder="Enter Password"
                  id="password"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-img"
            />
          </div>
        </div>
        <div className="bottom-container">
          <div className="passcount-and-search-container">
            <div className="passcount-and-text-container">
              <h1 className="bottom-heading">Your Passwords</h1>
              <div className="passcount-value-container">
                <p className="password-count">{filteredResults.length}</p>
              </div>
            </div>
            <div className="search-container">
              <div className="input-row">
                <label className="search-icon-container" htmlFor="searchIcon">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="input-icon"
                  />
                </label>
                <input
                  type="search"
                  className="search-input-box"
                  placeholder="Search"
                  id="searchIcon"
                  onChange={this.onChangeSearchPasswords}
                  value={searchPassword}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="myCheckbox"
              className="my-checkbox"
              onClick={this.toggleCheckBox}
            />
            <label className="bottom-description" htmlFor="myCheckbox">
              Show passwords
            </label>
          </div>
          {filteredResults.length > 0 ? (
            <ul className="unordered-list">
              {filteredResults.map(eachItem => (
                <li className="list-item-card-container" key={eachItem.website}>
                  <div className="profile-container">
                    <p className="profile-letter">
                      {eachItem.website[0].toUpperCase()}
                    </p>
                  </div>
                  <div className="each-item-container">
                    <p className="each-item-text-styling">{eachItem.website}</p>
                    <p className="each-item-text-styling">
                      {eachItem.username}
                    </p>
                    {isPassShown ? (
                      <p className="each-item-text-styling">
                        {eachItem.password}
                      </p>
                    ) : (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="pass-stars"
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => this.deleteItem(eachItem.website)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="delete-icon"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-passwords-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords-image"
              />
              <p className="no-passwords-paragraph">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App 
