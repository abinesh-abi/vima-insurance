export type Policy = {
  id: number;
  name: string;
  type: string;
  premium: number;
  coverage: number;
};

export type PolicyTypes = 'Term Life' | 'Health' | 'Vehicle'