export const getAnalytics = async (req, res) => {
  try {
    res.status(200).json({ message: 'Analytics data' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const appointShgSeller = async (req, res) => {
  res.status(201).json({ message: 'SHG Seller appointed' });
};

export const updateShgSeller = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `SHG Seller ${id} updated` });
};

export const deleteShgSeller = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `SHG Seller ${id} deleted` });
};
