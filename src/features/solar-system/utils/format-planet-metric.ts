const decimalFormatter = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 1,
});

const integerFormatter = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 0,
});

export function formatYear(yearDays: number) {
  if (yearDays < 1000) {
    return `${decimalFormatter.format(yearDays)} ngày`;
  }

  return `${decimalFormatter.format(yearDays / 365.25)} năm`;
}

export function formatDay(dayHours: number) {
  if (dayHours < 48) {
    return `${decimalFormatter.format(dayHours)} giờ`;
  }

  return `${decimalFormatter.format(dayHours / 24)} ngày`;
}

export function formatKilometers(value: number) {
  return `${integerFormatter.format(value)} km`;
}

export function formatDistance(value: number) {
  return `${decimalFormatter.format(value)} triệu km`;
}

export function formatGravity(value: number) {
  return `${decimalFormatter.format(value)} m/s²`;
}

export function formatTemperature(value: number) {
  return `${integerFormatter.format(value)}°C`;
}

export function formatMoons(value: number) {
  return integerFormatter.format(value);
}
