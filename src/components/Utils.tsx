import type { TooltipProps } from "recharts";

export function formatCurrency(value: number, decimals = 2): string {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(value);
}

export function formatNumber(value: number): string {
  return value.toLocaleString();
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export const createCustomTooltip = (
  formatFunction?: (value: number) => string
) => {
  return (props: TooltipProps<number, string>) => {
    const { active, payload, label }:{ active?: boolean; payload?: any; label?: string } = props;

    if (!active || !payload || !payload.length) {
      return null;
    }

    return (
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          fontSize: "12px",
          color: "#374151",
        }}
      >
        <p style={{ margin: "0 0 6px 0", fontWeight: "500" }}>{label}</p>
        {payload.map((entry:any, index:number) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "4px 0",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: entry.color,
                marginRight: "8px",
                borderRadius: "2px",
              }}
            />
            <span>
              {entry.name}:{" "}
              <strong style={{ color: entry.color }}>
                {formatFunction && typeof entry.value === "number"
                  ? formatFunction(entry.value)
                  : entry.value}
              </strong>
            </span>
          </div>
        ))}
      </div>
    );
  };
};
