const ctx = document.getElementById("growthChart");

new Chart(ctx, {
  type: "line",

  data: {
    labels: ["26 May", "2 Jun", "12 Jun", "22 Jun"],

    datasets: [
      {
        label: "Tswana",
        data: [100,100.07,105.15,109.97]
      },
      {
        label: "Sesotho",
        data: [100,101.63,104.79,105.41]
      },
      {
        label: "Ndebele",
        data: [100,100.00,101.25,101.25]
      },
      {
        label: "Xhosa",
        data: [100,100.00,100.54,100.62]
      },
      {
        label: "Venda",
        data: [100,100.22,100.45,100.56]
      },
      {
        label: "Zulu",
        data: [100,100.11,100.32,100.50]
      },
      {
        label: "Afrikaans",
        data: [100,100.08,100.18,100.29]
      },
      {
        label: "Xitsonga",
        data: [100,100.00,100.18,100.18]
      },
      {
        label: "Swati",
        data: [100,100.09,100.00,100.17]
      }
    ]
  },

  options: {

    responsive: true,

    interaction: {
      mode: "index",
      intersect: false
    },

    plugins: {

      title: {
        display: true,
        text: "SA Wikipedia Article Growth Index"
      },

      zoom: {
        zoom: {
          wheel: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          mode: "xy"
        },

        pan: {
          enabled: true,
          mode: "xy"
        }
      }
    }
  }
});
