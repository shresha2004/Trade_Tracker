import React, { useState } from 'react';
import axios from 'axios';


const TradeEntryForm = ({ onAddTrade, onClose }) => {
  const [Files, setFiles] = useState({
    beforeScreenshot: null,
    afterScreenshot: null,
  });

  const [loading,setLoading]=useState(false)

  const [formData, setFormData] = useState({
    date: '',
    type: 'spot',
    instrument: '',
    tradeType: 'buy',
    entryPrice: '',
    exitPrice: '',
    quantity: '',
    strategy: '',
    notes: '',
    beforeScreenshotUrl: '',
    afterScreenshotUrl: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'beforeScreenshot' || name === 'afterScreenshot') {
      setFiles({ ...Files, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const beforeScreenshotUrl = await uploadImage(Files.beforeScreenshot);
    const afterScreenshotUrl = await uploadImage(Files.afterScreenshot);

    const updatedFormData = {
      ...formData,
      beforeScreenshotUrl: beforeScreenshotUrl,
      afterScreenshotUrl: afterScreenshotUrl,
    };

    try {

      const response = await axios.post("https://trade-tracker-krqm.vercel.app/TradeEntryForm", updatedFormData,{withCredentials:true});

      console.log(response.data);
    } catch (err) {
      console.error(err);
    }

    onAddTrade(updatedFormData);

    setFormData({
      date: '',
      type: 'spot',
      instrument: '',
      tradeType: 'buy',
      entryPrice: '',
      exitPrice: '',
      quantity: '',
      strategy: '',
      notes: '',
      beforeScreenshotUrl: '',
      afterScreenshotUrl: '',
    });
    setFiles({
      beforeScreenshot: null,
      afterScreenshot: null,
    });
    setLoading(false)
  };

  const uploadImage = async (image) => {
    if (!image) return null;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'af2kchrh');

    const response = await axios.post('https://api.cloudinary.com/v1_1/dtyu88isr/image/upload', formData);
    return response.data.secure_url;
  };

  return (
    <div style={formContainerStyle} className="d-flex align-items-center justify-content-center">
      <div className="card p-4" style={formStyle}>
        <h4 className='d-flex justify-content-center'>Trade Entry Form</h4>
        <form onSubmit={handleSubmit}>
          <div className='container'>
            <div className='row'>
              <div className="col-md-6 form-group">
               
                <label  htmlFor="date">Date:</label>
                
                
                <input id="date" type="date" name="date" className="form-control " value={formData.date} onChange={handleChange} required />
                
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="instrument">Instrument:</label>
                <input id="instrument" type="text" name="instrument" className="form-control" value={formData.instrument} onChange={handleChange} required />
              </div>
            </div>
            <div className='row'>
              <div className="col-md-6 form-group">
                <label htmlFor="type">Type:</label>
                <select id="type" name="type" className="form-control" value={formData.type} onChange={handleChange} required>
                  <option value="spot">Spot</option>
                  <option value="futures">Futures</option>
                  <option value="options">Options</option>
                </select>
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="tradeType">Trade Type:</label>
                <select id="tradeType" name="tradeType" className="form-control" value={formData.tradeType} onChange={handleChange} required>
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>
            </div>
            <div className='row'>
              <div className="col-md-6 form-group">
                <label htmlFor="entryPrice">Entry Price:</label>
                <input id="entryPrice" type="number" name="entryPrice" className="form-control" value={formData.entryPrice} onChange={handleChange} required />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="exitPrice">Exit Price:</label>
                <input id="exitPrice" type="number" name="exitPrice" className="form-control" value={formData.exitPrice} onChange={handleChange} required />
              </div>
            </div>
            <div className='row'>
              <div className="col-md-6 form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input id="quantity" type="number" name="quantity" className="form-control" value={formData.quantity} onChange={handleChange} required />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="strategy">Strategy:</label>
                <input id="strategy" type="text" name="strategy" className="form-control" value={formData.strategy} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="notes">Notes:</label>
              <textarea id="notes" name="notes" className="form-control" value={formData.notes} onChange={handleChange}></textarea>
            </div>
            <div className='row'>
              <div className="col-md-6 form-group">
                <label htmlFor="beforeScreenshot">Before Screenshot:</label>
                <input id="beforeScreenshot" type="file" name="beforeScreenshot" className="form-control" onChange={handleChange}  required/>
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="afterScreenshot">After Screenshot:</label>
                <input id="afterScreenshot" type="file" name="afterScreenshot" className="form-control" onChange={handleChange}  required />
              </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <button type="submit" className="btn btn-success">Add Trade</button>
              <button type="button" onClick={onClose} className="btn btn-secondary">Close</button>
            </div>
          </div>
        </form>
      </div>
      {loading?(<> <div style={formContainerStyle}><div  className='spinnerStyle'>
      <div className="spinner-border text-success " role="status">
  <span className="visually-hidden">Loading...</span>
</div>
</div>
</div></>):(<></>)}
    </div>
    
  );
};

const formContainerStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  width: '100%',
  height: '100%',
  zIndex: 1000,
  overflowY: 'auto'
};

const formStyle = {
  width: '100%',
  maxWidth: '1200px',
  textAlign: 'center',
  borderRadius: '10px',
};

export default TradeEntryForm;
