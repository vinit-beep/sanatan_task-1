export const postApi = async (endPoint, data) => {
  const config = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  try {
    const response = await  fetch(endPoint,config);
    return response;
  } catch (e) {
    console.log((e) => e.message);
    throw e;
  }
};
