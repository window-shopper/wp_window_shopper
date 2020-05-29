import api from '../../api';

const apiCallByType = (type) => {
  if (type === 'productBox') {
    return api.deleteProductBox;
  }
  return api.deleteTemplate;
};

export default (id, type, cb) => apiCallByType(type)(id)
  .then(() => {
    cb();
  })
  .catch((err) => {
    console.log(err);
  });
