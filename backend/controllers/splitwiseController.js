import axios from 'axios';

const setToken= (req, res) =>{
    // Store the access token in session
    req.session.splitwiseAccessToken = req.user.accessToken;
    
    // Redirect back to dashboard instead of sending response
    res.redirect(`https://personal-finance-tracker-8tdm.onrender.com` + "/dashboard");
  }

 const getSplitwiseDashboard= async (req, res) => {

  const token = req.session.splitwiseAccessToken;
  
  if (!token) {
    return res.status(401).json({ 
      error: "Not authenticated with Splitwise",
      connectUrl: "/api/v1/splitwise/connect"
    });
  }

  try {
    // Get current user info
    const userResponse = await axios.get(
      'https://secure.splitwise.com/api/v3.0/get_current_user',
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const user = userResponse.data.user;

    // Get friends and their balances
    const friendsResponse = await axios.get(
      'https://secure.splitwise.com/api/v3.0/get_friends',
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    let totalOwed = 0;
    let totalToCollect = 0;
    let balanceDetails = [];
    let primaryCurrency = user.default_currency || 'USD';

    if (friendsResponse.data.friends && Array.isArray(friendsResponse.data.friends)) {
      friendsResponse.data.friends.forEach(friend => {
        if (friend.balance && Array.isArray(friend.balance)) {
          friend.balance.forEach(balance => {
            const amount = Number(balance.amount);
            const currency = balance.currency_code;
            
            // Set primary currency to the first currency we encounter
            if (balanceDetails.length === 0 && currency !== primaryCurrency) {
              primaryCurrency = currency;
            }
            
            balanceDetails.push({
              friend: `${friend.first_name} ${friend.last_name}`.trim(),
              amount: amount,
              currency: currency,
              type: amount < 0 ? 'owed' : 'to_collect'
            });
            
            // Only sum amounts in the same currency as primary currency
            if (currency === primaryCurrency) {
              if (amount < 0) {
                totalOwed += Math.abs(amount);
              } else if (amount > 0) {
                totalToCollect += amount;
              }
            }
          });
        }
      });
    }

    // Fix floating point precision
    totalOwed = Math.round(totalOwed * 100) / 100;
    totalToCollect = Math.round(totalToCollect * 100) / 100;
    const netBalance = Math.round((totalToCollect - totalOwed) * 100) / 100;

    res.json({
      success: true,
      user: {
        name: user.first_name || 'Unknown',
        email: user.email,
        picture: user.picture || user.custom_picture
      },
      balances: {
        totalOwed,
        totalToCollect,
        netBalance,
        currency: primaryCurrency
      },
      details: balanceDetails,
      summary: {
        totalFriends: balanceDetails.length,
        isInDebt: netBalance < 0,
        status: netBalance < 0 ? 'You owe money' : netBalance > 0 ? 'You are owed money' : 'All settled up!'
      }
    });

  } catch (err) {
    console.error('Splitwise API Error:', err.response?.data || err.message);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch Splitwise data",
      message: err.response?.data?.error || err.message
    });
  }
}

const  getStatus= (req, res) => {
  const isConnected = !!req.session.splitwiseAccessToken;
  res.json({
    connected: isConnected,
    connectUrl: isConnected ? null : "/api/v1/splitwise/connect"
  });
}

const disconnect=(req, res) => {
  // Remove the token from session
  req.session.splitwiseAccessToken = null;

  res.json({
    success: true,
    message: "Splitwise disconnected successfully",
    connectUrl: "/api/v1/splitwise/connect"
  });
}
  export {setToken,getSplitwiseDashboard,getStatus,disconnect}