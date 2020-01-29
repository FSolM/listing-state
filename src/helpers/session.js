export default (() => {
  // Doesn't matter if it's empty
  const getCookie = () => {
    const cookie = document.cookie.split(';')[0];
    return cookie.substring(9, cookie.length);
  };
  
  const setCookie = (username) => {
    const date = new Date();
    document.cookie = `username=${username}; expires=${date.setFullYear(date.getFullYear() + 1)}`;
  };

  const deleteCookie = () => { document.cookie = `username=; expires=Thu, 18 Dec 2013 12:00:00 UTC`; };

  const getCurrentUser = () => getCookie();

  const setCurrentUser = (username) => { setCookie(username); };

  const deleteCurrentUser = () => { deleteCookie(); }

  return { getCurrentUser, setCurrentUser, deleteCurrentUser } 
})();
