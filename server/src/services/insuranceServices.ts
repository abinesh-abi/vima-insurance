import _ from "lodash";
import { Policies } from "../database";
import { Policy } from "../types/global";

type GetPolicyType = {
  search?: string;
  sort?: string;
  sortDir?: string;
  type?: string[];
  minPre?: number;
  maxPre?: number;
  minCov?: number;
};

export default {
  getPolicies: function ({
    search,
    sort,
    sortDir,
    type,
    maxPre,
    minCov,
    minPre,
  }: GetPolicyType): Policy[] {
    let policies = [];
    if (search || type || minPre || maxPre || minCov) {
      // handling search
      policies = Policies.filter((policy) => {
        /** handle search */
        if (search) {
          const searchPassed = policy.name
            .toLocaleLowerCase()
            .startsWith(search.toLocaleLowerCase());

          // search condition not passed
          if (!searchPassed) return false;
        }
        /** handle type  filter*/
        if (type) {
          const isPassed = type.includes(policy.type);

          // search condition not passed
          if (!isPassed) return false;
        }
        /** handle minimum Premium  */
        if (minPre) {
          const isPassed = policy.premium >= minPre;

          // minimum premium condition not passed
          if (!isPassed) return false;
        }
        /** handle max Premium  */
        if (maxPre) {
          const isPassed = policy.premium <= maxPre;

          // max premium condition not passed
          if (!isPassed) return false;
        }
        /** handle min minimum Coverage  */
        if (minCov) {
          const isPassed = policy.coverage >= minCov;

          // min premium condition not passed
          if (!isPassed) return false;
        }

        return true;
      });
    } else {
      policies = Policies;
    }

    if (sort) {
      let sortedArr: Policy[] = ([] = _.sortBy(policies, sort));
      if (sortDir === "desc") sortedArr = sortedArr.reverse();
      return sortedArr;
    }

    return policies;
  },
};
