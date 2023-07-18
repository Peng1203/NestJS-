export interface UserStruct {
  id: number;
  userName: string;
  createTime: string | Date;
  updateTime: string | Date;
  roleId: number;
  roleName: string;
}

export interface UserData {
  list: UserStruct[];
  total: number;
}
