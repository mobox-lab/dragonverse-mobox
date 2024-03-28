export type RewardDataItem = {
  balance: string;
  share: string;
  musicBox: number;
  blueBox: number;
};

export const generateRewardData = () => {
  let data = [];
  let totalBalance = 2100000;
  let balancePerItem = totalBalance * 1;

  for (let i = 1; i <= 50; i++) {
    let musicBox = 0,
      blueBox = 0;
    let share = (i * 0.1).toFixed(1) + '%';
    let balance = (balancePerItem * i).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    blueBox = Math.floor(i / 6);
    musicBox = i % 6;

    data.push({
      balance,
      share,
      musicBox,
      blueBox,
    });
  }

  return data;
};
